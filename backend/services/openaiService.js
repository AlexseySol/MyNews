const axios = require('axios');
const { OPENAI_API_KEY } = require('../config/env');

const axiosInstance = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Сервис для работы с OpenAI API
 * 
 * Отвечает за обработку текста, генерацию контента и другие операции с использованием моделей GPT.
 * Использует axios для выполнения HTTP-запросов к OpenAI API.
 */
const openaiService = {
  /**
   * Отправка запроса к OpenAI API
   * @param {string} prompt - Запрос пользователя
   * @param {Array} context - Контекст беседы
   * @param {Object} news - Объект с новостями (опционально)
   * @param {number} retries - Количество попыток запроса (по умолчанию 3)
   */
  askOpenAI: async (prompt, context, news = null, retries = 3) => {
    let model = 'gpt-4o-mini-2024-07-18';
    let isPostRequest = false;
    
    if (prompt.toLowerCase().includes('пост') && 
        (prompt.toLowerCase().includes('telegram') || prompt.toLowerCase().includes('тг') || prompt.toLowerCase().includes('телеграм'))) {
      model = 'gpt-4o-2024-08-06';
      isPostRequest = true;
    }
    console.log(`Using model: ${model}`);

    const systemPrompt = getSystemPrompt(isPostRequest);

    for (let i = 0; i < retries; i++) {
      try {
        const messages = [
          { role: 'system', content: systemPrompt },
          ...context,
          { role: 'user', content: news ? `Новости: ${JSON.stringify(news)}\n\nЗапрос: ${prompt}` : prompt }
        ];
        const response = await axiosInstance.post('/chat/completions', {
          model: model,
          messages: messages,
          max_tokens: 1000,
          temperature: 0,
        });

        return response.data.choices[0].message.content;
      } catch (error) {
        console.error(`Attempt ${i + 1} failed: ${error.message}`);
        if (i === retries - 1) throw error;
        await delay(1000 * (i + 1)); // Экспоненциальная задержка перед повторной попыткой
      }
    }
  },

  /**
   * Обработка новости с помощью ИИ
   */
  processNews: async (newsContent) => {
    const prompt = `Обработай следующую новость и предоставь краткое резюме: ${newsContent}`;
    return openaiService.askOpenAI(prompt, []);
  },

  /**
   * Генерация краткого описания новости
   */
  generateSummary: async (content) => {
    const prompt = `Создай краткое описание для следующей новости в пределах 280 символов: ${content}`;
    return openaiService.askOpenAI(prompt, []);
  },

  /**
   * Анализ тональности текста
   */
  analyzeSentiment: async (text) => {
    const prompt = `Проанализируй тональность следующего текста и определи, является ли она позитивной, негативной или нейтральной: ${text}`;
    return openaiService.askOpenAI(prompt, []);
  }
};

/**
 * Получение системного промпта в зависимости от типа запроса
 */
function getSystemPrompt(isPostRequest) {
  if (isPostRequest) {
    return `Ты - опытный редактор новостного Telegram-канала об ИИ. Твоя задача - создавать интересные и информативные посты на основе предоставленных новостей. Используй эмодзи, где уместно, и форматирование текста для лучшей читаемости. Ограничь длину поста до 1000 символов.`;
  } else {
    return `Ты - ИИ-ассистент, специализирующийся на новостях в области искусственного интеллекта. Твоя задача - помогать в обработке и анализе новостей, предоставляя точную и актуальную информацию.`;
  }
}

module.exports = openaiService;
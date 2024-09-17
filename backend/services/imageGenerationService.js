const axios = require('axios');
const { OPENAI_API_KEY } = require('../config/env');

const axiosInstance = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

/**
 * Сервис для генерации изображений
 * 
 * Отвечает за создание изображений на основе текстовых описаний с использованием OpenAI API.
 */
const imageGenerationService = {
  /**
   * Генерация изображения на основе текстового описания
   * @param {string} prompt - Текстовое описание для генерации изображения
   */
  generateImage: async (prompt) => {
    try {
      const response = await axiosInstance.post('/images/generations', {
        prompt: prompt,
        n: 1,
        size: "1024x1024"
      });

      if (response.data && response.data.data && response.data.data.length > 0) {
        return response.data.data[0].url;
      } else {
        throw new Error('Неожиданный формат ответа от API генерации изображений');
      }
    } catch (error) {
      console.error('Ошибка при генерации изображения:', error);
      throw new Error(`Ошибка при генерации изображения: ${error.message}`);
    }
  }
};

module.exports = imageGenerationService;
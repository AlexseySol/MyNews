const openaiService = require('../services/openaiService');
const imageGenerationService = require('../services/imageGenerationService');

/**
 * Контроллер для работы с ИИ
 * 
 * Отвечает за обработку запросов, связанных с использованием ИИ для обработки текста и генерации изображений.
 * Взаимодействует с сервисами OpenAI и сервисом генерации изображений.
 */
const aiController = {
  /**
   * Обработка новости с помощью ИИ
   */
  processNews: async (req, res, next) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ message: 'Необходимо предоставить содержание новости' });
      }

      const processedContent = await openaiService.processText(content);
      res.json({ processedContent });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Генерация изображения на основе текстового описания
   */
  generateImage: async (req, res, next) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ message: 'Необходимо предоставить текстовое описание для генерации изображения' });
      }

      const imageUrl = await imageGenerationService.generateImage(prompt);
      res.json({ imageUrl });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Анализ тональности текста
   */
  analyzeSentiment: async (req, res, next) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ message: 'Необходимо предоставить текст для анализа' });
      }

      const sentiment = await openaiService.analyzeSentiment(text);
      res.json({ sentiment });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Генерация краткого описания новости
   */
  generateSummary: async (req, res, next) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ message: 'Необходимо предоставить содержание новости' });
      }

      const summary = await openaiService.generateSummary(content);
      res.json({ summary });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = aiController;
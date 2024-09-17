const axios = require('axios');
const { HUGGING_FACE_API_KEY, HUGGING_FACE_API_URL } = require('../config/env');

/**
 * Сервис для работы с Hugging Face API
 * 
 * Отвечает за получение информации о моделях и датасетах, связанных с ИИ, из Hugging Face.
 * Использует axios для выполнения HTTP-запросов к Hugging Face API.
 */
const huggingfaceService = {
  /**
   * Получение последних моделей ИИ
   */
  getNews: async () => {
    try {
      const response = await axios.get(`${HUGGING_FACE_API_URL}/models`, {
        params: {
          sort: 'updated',
          direction: -1,
          limit: 20
        },
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`
        }
      });

      return response.data.map(model => ({
        title: model.modelId,
        description: model.description,
        link: `https://huggingface.co/${model.modelId}`,
        pubDate: model.lastModified,
        source: 'Hugging Face',
        likes: model.likes
      }));
    } catch (error) {
      throw new Error(`Ошибка при получении данных из Hugging Face: ${error.message}`);
    }
  },

  /**
   * Получение информации о конкретной модели
   */
  getModelInfo: async (modelId) => {
    try {
      const response = await axios.get(`${HUGGING_FACE_API_URL}/models/${modelId}`, {
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`
        }
      });

      return {
        id: response.data.modelId,
        name: response.data.name,
        description: response.data.description,
        likes: response.data.likes,
        downloads: response.data.downloads,
        lastModified: response.data.lastModified
      };
    } catch (error) {
      throw new Error(`Ошибка при получении информации о модели: ${error.message}`);
    }
  }
};

module.exports = huggingfaceService;
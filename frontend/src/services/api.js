import axios from 'axios';

/**
 * API Сервис
 * 
 * Этот модуль отвечает за взаимодействие с бэкендом.
 * Взаимодействует с:
 * - Axios для выполнения HTTP-запросов
 * - Бэкенд-сервером приложения
 * Отвечает за:
 * - Выполнение запросов к API для работы с новостями
 * - Выполнение запросов к API для работы с ИИ
 * - Обработку ошибок и форматирование ответов
 */

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'; // Обновлено: правильный порт

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiService = {
  // Методы для работы с новостями
  getNews: (source) => api.get(`/news?source=${source}`),
  getNewsDetails: (id) => api.get(`/news/${id}`),
  updateNews: (news) => api.put(`/news/${news.id}`, news),

  // Методы для работы с ИИ
  processNewsWithAI: (newsContent) => api.post('/ai/process-news', { content: newsContent }),
  generateImageWithAI: (prompt) => api.post('/ai/generate-image', { prompt }),
  analyzeSentimentWithAI: (text) => api.post('/ai/analyze-sentiment', { text }),

  // Дополнительные методы могут быть добавлены здесь
};

export default apiService;

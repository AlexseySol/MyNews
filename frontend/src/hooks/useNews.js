import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Хук useNews
 * 
 * Предоставляет функциональность для работы с новостями.
 * 
 * @returns {Object} Объект с функциями и состояниями для работы с новостями
 */
const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Получает список новостей из указанного источника
   * @param {string} source - Источник новостей
   */
  const fetchNews = useCallback(async (source) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getNews(source);
      setNews(response.data);
    } catch (err) {
      setError('Ошибка при загрузке новостей');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Получает детали конкретной новости по ID
   * @param {string} id - ID новости
   * @returns {Promise<Object>} Детали новости
   */
  const getNewsDetails = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getNewsDetails(id);
      return response.data;
    } catch (err) {
      setError('Ошибка при загрузке деталей новости');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { news, loading, error, fetchNews, getNewsDetails };
};

export default useNews;
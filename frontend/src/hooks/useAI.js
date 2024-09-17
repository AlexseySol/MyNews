import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Хук useAI
 * 
 * Предоставляет функциональность для взаимодействия с ИИ-сервисами.
 * 
 * @returns {Object} Объект с функциями и состояниями для работы с ИИ
 */
const useAI = () => {
  const [aiResult, setAIResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Обрабатывает новость с помощью ИИ
   * @param {string} newsContent - Содержание новости
   * @returns {Promise<Object>} Результат обработки
   */
  const processNews = useCallback(async (newsContent) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.processNewsWithAI(newsContent);
      setAIResult(response.data);
      return response.data;
    } catch (err) {
      setError('Ошибка при обработке новости с помощью ИИ');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Генерирует изображение на основе текстового описания
   * @param {string} prompt - Текстовое описание для генерации изображения
   * @returns {Promise<string>} URL сгенерированного изображения
   */
  const generateImage = useCallback(async (prompt) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.generateImageWithAI(prompt);
      return response.data.imageUrl;
    } catch (err) {
      setError('Ошибка при генерации изображения');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { aiResult, loading, error, processNews, generateImage };
};

export default useAI;
import React, { useState, useEffect } from 'react';
import { useNews } from '../hooks/useNews';
import NewsItem from './NewsItem';
import '../styles/components/NewsList.css';

/**
 * Компонент NewsList
 * 
 * Этот компонент отвечает за отображение списка новостей.
 * 
 * Взаимодействует с:
 * - Хуком useNews для получения данных о новостях
 * - Компонентом NewsItem для отображения отдельных новостей
 * - CSS файлом для стилизации
 * 
 * Отвечает за:
 * - Загрузку и отображение списка новостей
 * - Обработку пагинации
 * - Фильтрацию новостей (если применимо)
 * - Обработку ошибок при загрузке данных
 */
const NewsList = () => {
  const [page, setPage] = useState(1);
  const { news, loading, error } = useNews(page);

  if (loading) return <div className="news-list__loading">Загрузка новостей...</div>;
  if (error) return <div className="news-list__error">Ошибка при загрузке новостей: {error}</div>;

  return (
    <div className="news-list">
      {news.map(item => (
        <NewsItem key={item.id} news={item} />
      ))}
      <div className="news-list__pagination">
        <button onClick={() => setPage(prev => Math.max(1, prev - 1))} disabled={page === 1}>
          Предыдущая
        </button>
        <span>Страница {page}</span>
        <button onClick={() => setPage(prev => prev + 1)} disabled={news.length < 10}>
          Следующая
        </button>
      </div>
    </div>
  );
};

export default NewsList;
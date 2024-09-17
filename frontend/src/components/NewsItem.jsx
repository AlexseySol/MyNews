import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/NewsItem.css';

/**
 * Компонент NewsItem
 * 
 * Этот компонент отвечает за отображение отдельной новости в списке.
 * 
 * Взаимодействует с:
 * - React Router для создания ссылки на детальный просмотр новости
 * - CSS файлом для стилизации
 * 
 * Отвечает за:
 * - Отображение краткой информации о новости (заголовок, описание, дата, источник)
 * - Предоставление ссылки на полную версию новости
 */
const NewsItem = ({ news }) => {
  return (
    <div className="news-item">
      {news.image && <img src={news.image} alt={news.title} className="news-item__image" />}
      <div className="news-item__content">
        <h2 className="news-item__title">{news.title}</h2>
        <p className="news-item__description">{news.description}</p>
        <div className="news-item__meta">
          <span className="news-item__date">{new Date(news.date).toLocaleDateString()}</span>
          <span className="news-item__source">{news.source}</span>
        </div>
        <Link to={`/news/${news.id}`} className="news-item__link">Подробнее</Link>
      </div>
    </div>
  );
};

export default NewsItem;
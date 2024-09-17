import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useNews from '../hooks/useNews';
import '../styles/pages/NewsProcessing.css';

/**
 * Компонент NewsProcessing
 * 
 * Этот компонент отвечает за отображение списка новостей из выбранного источника.
 * 
 * Функциональность:
 * - Загружает новости из выбранного источника
 * - Отображает список новостей
 * - Предоставляет функцию поиска по новостям
 * - Позволяет переходить к детальному просмотру новости
 * 
 * Взаимодействует с:
 * - React Router для получения параметров URL и навигации
 * - Хуком useNews для получения данных о новостях
 * - Стилями из '../styles/pages/NewsProcessing.css'
 * 
 * @returns {JSX.Element} Разметка компонента NewsProcessing
 */
const NewsProcessing = () => {
  const { source } = useParams();
  const navigate = useNavigate();
  const { getNews, loading, error } = useNews();
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Загрузка новостей при монтировании компонента или изменении источника
  useEffect(() => {
    const fetchNews = async () => {
      const fetchedNews = await getNews(source);
      setNews(fetchedNews);
    };
    fetchNews();
  }, [source, getNews]);

  // Фильтрация новостей на основе поискового запроса
  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Обработчик клика по новости
   * @param {string} newsId - ID выбранной новости
   */
  const handleNewsClick = (newsId) => {
    navigate(`/news/${source}/${newsId}`);
  };

  if (loading) return <div className="news-processing__loading">Загрузка новостей...</div>;
  if (error) return <div className="news-processing__error">Ошибка: {error}</div>;

  return (
    <div className="news-processing">
      <h1 className="news-processing__title">Новости из {source}</h1>
      <input
        type="text"
        placeholder="Поиск новостей..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="news-processing__search"
      />
      <div className="news-processing__list">
        {filteredNews.map((item) => (
          <div 
            key={item.id} 
            className="news-processing__item"
            onClick={() => handleNewsClick(item.id)}
          >
            <h2 className="news-processing__item-title">{item.title}</h2>
            <p className="news-processing__item-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsProcessing;
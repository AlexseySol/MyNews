import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/NewsSource.css';

/**
 * Компонент NewsSource
 * 
 * Этот компонент отвечает за страницу выбора источника новостей.
 * 
 * Взаимодействует с:
 * - React Router для навигации
 * - Контекстом или хуком для сохранения выбранного источника
 * - CSS файлом для стилизации
 * 
 * Отвечает за:
 * - Отображение доступных источников новостей
 * - Обработку выбора пользователя
 * - Перенаправление на страницу со списком новостей выбранного источника
 */
const NewsSource = () => {
  const [selectedSource, setSelectedSource] = useState('');
  const navigate = useNavigate();

  const sources = [
    { id: 'rss', name: 'RSS лента' },
    { id: 'github', name: 'GitHub' },
    { id: 'huggingface', name: 'Hugging Face' },
    { id: 'custom', name: 'Пользовательский источник' }
  ];

  const handleSourceSelect = (sourceId) => {
    setSelectedSource(sourceId);
  };

  const handleSubmit = () => {
    if (selectedSource) {
      navigate(`/news-list/${selectedSource}`);
    }
  };

  return (
    <div className="news-source">
      <h1 className="news-source__title">Выберите источник новостей</h1>
      <div className="news-source__list">
        {sources.map((source) => (
          <button
            key={source.id}
            className={`news-source__item ${selectedSource === source.id ? 'news-source__item--selected' : ''}`}
            onClick={() => handleSourceSelect(source.id)}
          >
            {source.name}
          </button>
        ))}
      </div>
      <button className="news-source__submit" onClick={handleSubmit} disabled={!selectedSource}>
        Подтвердить выбор
      </button>
    </div>
  );
};

export default NewsSource;
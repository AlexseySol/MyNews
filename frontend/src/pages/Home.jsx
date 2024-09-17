import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Home.css';

/**
 * Компонент Home
 * 
 * Этот компонент отвечает за отображение главной страницы приложения.
 * 
 * Функциональность:
 * - Отображает заголовок приложения
 * - Предоставляет пользователю выбор источника новостей
 * - Осуществляет навигацию к выбранному источнику новостей
 * 
 * Взаимодействует с:
 * - React Router для навигации
 * - Стилями из '../styles/pages/Home.css'
 * 
 * @returns {JSX.Element} Разметка компонента Home
 */
const Home = () => {
  const navigate = useNavigate();

  // Массив доступных источников новостей
  const newsSources = [
    { id: 'rss', name: 'RSS Ленты' },
    { id: 'api', name: 'API (GitHub, Hugging Face)' },
    { id: 'custom', name: 'Пользовательский источник' }
  ];

  /**
   * Обработчик выбора источника новостей
   * @param {string} sourceId - ID выбранного источника
   */
  const handleSourceSelect = (sourceId) => {
    navigate(`/news/${sourceId}`);
  };

  return (
    <div className="home">
      <h1 className="home__title">AI News Processor</h1>
      <p className="home__description">
        Выберите источник новостей для обработки:
      </p>
      <div className="home__sources">
        {newsSources.map((source) => (
          <button
            key={source.id}
            className="home__source-button"
            onClick={() => handleSourceSelect(source.id)}
          >
            {source.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
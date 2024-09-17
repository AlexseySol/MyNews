import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/**
 * Точка входа React-приложения
 * 
 * Этот файл инициализирует React-приложение, рендеря корневой компонент App
 * в DOM-элемент с id 'root'.
 * 
 * Здесь также можно добавить дополнительные настройки, такие как:
 * - Инициализация сервис-воркеров для PWA
 * - Подключение инструментов аналитики
 * - Настройка глобальных обработчиков ошибок
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
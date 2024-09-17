import React, { createContext, useContext } from 'react';
import useNews from '../hooks/useNews';

/**
 * Контекст News
 * 
 * Этот модуль создает и экспортирует контекст для работы с новостями,
 * а также предоставляет провайдер для этого контекста.
 * 
 * Взаимодействует с:
 * - Хуком useNews для получения функциональности работы с новостями
 * - Компонентами верхнего уровня (например, App.js) для оборачивания приложения
 * - Другими компонентами через хук useNewsContext для доступа к функциональности новостей
 * 
 * Роль:
 * - Обеспечивает глобальный доступ к функциональности работы с новостями во всем приложении
 * - Позволяет избежать prop drilling при передаче функций и данных о новостях
 */

const NewsContext = createContext();

// Хук для использования контекста News в компонентах
export const useNewsContext = () => useContext(NewsContext);

// Провайдер контекста News
export const NewsProvider = ({ children }) => {
  const newsHook = useNews();

  return (
    <NewsContext.Provider value={newsHook}>
      {children}
    </NewsContext.Provider>
  );
};
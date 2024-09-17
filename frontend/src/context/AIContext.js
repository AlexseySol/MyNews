import React, { createContext, useContext } from 'react';
import useAI from '../hooks/useAI';

/**
 * Контекст AI
 * 
 * Этот модуль создает и экспортирует контекст для работы с ИИ,
 * а также предоставляет провайдер для этого контекста.
 * 
 * Взаимодействует с:
 * - Хуком useAI для получения функциональности ИИ
 * - Компонентами верхнего уровня (например, App.js) для оборачивания приложения
 * - Другими компонентами через хук useAIContext для доступа к функциональности ИИ
 * 
 * Роль:
 * - Обеспечивает глобальный доступ к функциональности ИИ во всем приложении
 * - Позволяет избежать prop drilling при передаче функций ИИ
 */

const AIContext = createContext();

// Хук для использования контекста AI в компонентах
export const useAIContext = () => useContext(AIContext);

// Провайдер контекста AI
export const AIProvider = ({ children }) => {
  const aiHook = useAI();

  return (
    <AIContext.Provider value={aiHook}>
      {children}
    </AIContext.Provider>
  );
};
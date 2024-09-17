import React from 'react';
import '../styles/components/ImagePreview.css';

/**
 * Компонент ImagePreview
 * 
 * Этот компонент отвечает за предпросмотр сгенерированного ИИ изображения.
 * 
 * Взаимодействует с:
 * - Родительским компонентом, который передает URL изображения и функции для управления
 * - CSS файлом для стилизации
 * 
 * Отвечает за:
 * - Отображение сгенерированного изображения
 * - Предоставление кнопок для регенерации изображения и его использования
 * - Отображение состояния загрузки
 */
const ImagePreview = ({ imageUrl, onRegenerate, onUse, isLoading }) => {
  return (
    <div className="image-preview">
      {isLoading ? (
        <div className="image-preview__loading">Генерация изображения...</div>
      ) : imageUrl ? (
        <>
          <img src={imageUrl} alt="Сгенерированное изображение" className="image-preview__image" />
          <div className="image-preview__controls">
            <button onClick={onRegenerate} className="image-preview__button image-preview__button--regenerate">
              Сгенерировать новое
            </button>
            <button onClick={onUse} className="image-preview__button image-preview__button--use">
              Использовать это изображение
            </button>
          </div>
        </>
      ) : (
        <div className="image-preview__empty">Изображение еще не сгенерировано</div>
      )}
    </div>
  );
};

export default ImagePreview;
import React, { useState } from 'react';
import '../styles/components/TelegramPreview.css';

/**
 * Компонент TelegramPreview
 * 
 * Этот компонент отвечает за предпросмотр и редактирование поста для Telegram.
 * 
 * Взаимодействует с:
 * - Родительским компонентом, который передает начальный текст и изображение
 * - CSS файлом для стилизации
 * 
 * Отвечает за:
 * - Отображение предпросмотра поста в стиле Telegram
 * - Предоставление возможности редактирования текста поста
 * - Отображение выбранного изображения
 * - Предоставление кнопки для публикации поста
 */
const TelegramPreview = ({ initialText, image, onPublish }) => {
  const [text, setText] = useState(initialText);

  const handlePublish = () => {
    onPublish(text);
  };

  return (
    <div className="telegram-preview">
      <div className="telegram-preview__post">
        {image && <img src={image} alt="Изображение поста" className="telegram-preview__image" />}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="telegram-preview__text"
          placeholder="Введите текст поста..."
        />
      </div>
      <div className="telegram-preview__controls">
        <button onClick={handlePublish} className="telegram-preview__publish-button">
          Опубликовать в Telegram
        </button>
      </div>
    </div>
  );
};

export default TelegramPreview;
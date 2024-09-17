import React, { useState, useEffect, useRef } from 'react';
import useAI from '../hooks/useAI';
import '../styles/components/AIChat.css';

/**
 * Компонент AIChat
 * 
 * Этот компонент представляет интерфейс чата для взаимодействия с ИИ.
 * 
 * Взаимодействует с:
 * - Хуком useAI для обработки сообщений с помощью ИИ
 * - Родительским компонентом, который передает идентификатор новости (newsId)
 * 
 * Пропсы:
 * - newsId: идентификатор новости, контекст которой используется в чате
 */
const AIChat = ({ newsId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { processNews, loading, error } = useAI();
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages(prev => [...prev, { type: 'user', content: input }]);
      setInput('');
      try {
        const aiResponse = await processNews(input);
        setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
      } catch (err) {
        console.error('Error processing message:', err);
      }
    }
  };

  return (
    <div className="ai-chat">
      <div className="ai-chat__messages">
        {messages.map((message, index) => (
          <div key={index} className={`ai-chat__message ai-chat__message--${message.type}`}>
            {message.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="ai-chat__input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите ваш вопрос..."
          className="ai-chat__input"
        />
        <button type="submit" className="ai-chat__submit" disabled={loading}>
          Отправить
        </button>
      </form>
      {error && <div className="ai-chat__error">{error}</div>}
    </div>
  );
};

export default AIChat;
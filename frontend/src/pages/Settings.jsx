import React, { useState, useEffect } from 'react';
import '../styles/pages/Settings.css';

/**
 * Компонент Settings
 * 
 * Этот компонент отвечает за страницу настроек приложения.
 * 
 * Взаимодействует с:
 * - Локальным хранилищем для сохранения настроек
 * - CSS файлом для стилизации
 * 
 * Отвечает за:
 * - Отображение и изменение настроек приложения
 * - Сохранение настроек в локальное хранилище
 * - Применение настроек к работе приложения
 */
const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    aiModel: 'gpt-3',
    language: 'ru',
    telegramToken: ''
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    // Здесь можно добавить логику применения настроек к приложению
    alert('Настройки сохранены');
  };

  return (
    <div className="settings">
      <h1 className="settings__title">Настройки</h1>
      <form className="settings__form">
        <div className="settings__field">
          <label htmlFor="darkMode">Темный режим</label>
          <input
            type="checkbox"
            id="darkMode"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
          />
        </div>
        <div className="settings__field">
          <label htmlFor="aiModel">Модель ИИ</label>
          <select
            id="aiModel"
            name="aiModel"
            value={settings.aiModel}
            onChange={handleChange}
          >
            <option value="gpt-3">GPT-3</option>
            <option value="gpt-4">GPT-4</option>
          </select>
        </div>
        <div className="settings__field">
          <label htmlFor="language">Язык</label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleChange}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="settings__field">
          <label htmlFor="telegramToken">Токен Telegram бота</label>
          <input
            type="text"
            id="telegramToken"
            name="telegramToken"
            value={settings.telegramToken}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleSave} className="settings__save-button">
          Сохранить настройки
        </button>
      </form>
    </div>
  );
};

export default Settings;
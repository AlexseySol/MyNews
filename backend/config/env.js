const dotenv = require('dotenv');
const path = require('path');

// Загрузка переменных окружения из файла .env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
  // Основные настройки сервера
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // API ключи
  HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY,
  GITHUB_API_KEY: process.env.GITHUB_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,

  // URL и настройки для различных сервисов
  RSS_FEEDS: JSON.parse(process.env.RSS_FEEDS || '{}'),
  GITHUB_API_URL: process.env.GITHUB_API_URL || 'https://api.github.com',
  HUGGING_FACE_API_URL: process.env.HUGGING_FACE_API_URL || 'https://api-inference.huggingface.co/models/',
  OPENAI_API_URL: process.env.OPENAI_API_URL || 'https://api.openai.com/v1',

  // Настройки базы данных (если используется)
  DB_URI: process.env.DB_URI,

  // Другие настройки
  MAX_NEWS_PER_PAGE: parseInt(process.env.MAX_NEWS_PER_PAGE) || 10,
  DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE || 'ru',

  // Функция для проверки наличия всех необходимых переменных окружения
  validateEnv: () => {
    const requiredEnvs = [
      'HUGGING_FACE_API_KEY',
      'GITHUB_API_KEY',
      'OPENAI_API_KEY',
      'TELEGRAM_BOT_TOKEN',
      'RSS_FEEDS'
    ];

    requiredEnvs.forEach(env => {
      if (!process.env[env]) {
        throw new Error(`Отсутствует обязательная переменная окружения: ${env}`);
      }
    });
  }
};
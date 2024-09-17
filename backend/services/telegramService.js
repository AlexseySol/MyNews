const TelegramBot = require('node-telegram-bot-api');
const { TELEGRAM_BOT_TOKEN } = require('../config/env');

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

/**
 * Сервис для работы с Telegram API
 * 
 * Отвечает за отправку сообщений и управление Telegram ботом.
 */
const telegramService = {
  /**
   * Отправка сообщения в Telegram канал
   * @param {string} message - Текст сообщения
   * @param {string} imageUrl - URL изображения (опционально)
   */
  sendMessage: async (message, imageUrl = null) => {
    try {
      const chatId = process.env.TELEGRAM_CHANNEL_ID; // ID вашего канала
      let sentMessage;

      if (imageUrl) {
        sentMessage = await bot.sendPhoto(chatId, imageUrl, { caption: message });
      } else {
        sentMessage = await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
      }

      return sentMessage;
    } catch (error) {
      console.error('Ошибка при отправке сообщения в Telegram:', error);
      throw new Error(`Ошибка при отправке сообщения в Telegram: ${error.message}`);
    }
  },

  /**
   * Получение информации о Telegram канале
   */
  getChannelInfo: async () => {
    try {
      const chatId = process.env.TELEGRAM_CHANNEL_ID;
      const chatInfo = await bot.getChat(chatId);
      return {
        title: chatInfo.title,
        description: chatInfo.description,
        memberCount: chatInfo.member_count
      };
    } catch (error) {
      console.error('Ошибка при получении информации о канале:', error);
      throw new Error(`Ошибка при получении информации о канале: ${error.message}`);
    }
  },

  /**
   * Получение статистики публикаций в Telegram канале
   */
  getPublishingStats: async () => {
    // Реализация этого метода зависит от того, как вы хотите собирать и хранить статистику.
    // Возможно, вам потребуется дополнительное хранилище данных для этой информации.
    throw new Error('Метод getPublishingStats еще не реализован');
  }
};

module.exports = telegramService;
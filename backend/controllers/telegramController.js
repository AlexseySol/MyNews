const telegramService = require('../services/telegramService');

/**
 * Контроллер для работы с Telegram
 * 
 * Отвечает за обработку запросов, связанных с публикацией новостей в Telegram.
 * Взаимодействует с сервисом Telegram для отправки сообщений.
 */
const telegramController = {
  /**
   * Публикация новости в Telegram канале
   */
  publishNews: async (req, res, next) => {
    try {
      const { title, content, imageUrl } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: 'Необходимо предоставить заголовок и содержание новости' });
      }

      const message = `${title}\n\n${content}`;
      const result = await telegramService.sendMessage(message, imageUrl);
      
      res.json({ success: true, messageId: result.message_id });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Получение информации о Telegram канале
   */
  getChannelInfo: async (req, res, next) => {
    try {
      const channelInfo = await telegramService.getChannelInfo();
      res.json(channelInfo);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Получение статистики публикаций в Telegram канале
   */
  getPublishingStats: async (req, res, next) => {
    try {
      const stats = await telegramService.getPublishingStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = telegramController;
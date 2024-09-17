const express = require('express');
const router = express.Router();
const telegramController = require('../controllers/telegramController');

/**
 * Маршруты для работы с Telegram
 * 
 * Определяет API эндпоинты для публикации новостей в Telegram
 * и получения информации о канале.
 * Использует методы из telegramController для обработки запросов.
 */

// Публикация новости в Telegram канале
router.post('/publish', telegramController.publishNews);

// Получение информации о Telegram канале
router.get('/channel-info', telegramController.getChannelInfo);

// Получение статистики публикаций в Telegram канале
router.get('/stats', telegramController.getPublishingStats);

module.exports = router;
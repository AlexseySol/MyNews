const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

/**
 * Маршруты для работы с ИИ
 * 
 * Определяет API эндпоинты для обработки текста, генерации изображений
 * и других операций с использованием ИИ.
 * Использует методы из aiController для обработки запросов.
 */

// Обработка новости с помощью ИИ
router.post('/process-news', aiController.processNews);

// Генерация изображения на основе текстового описания
router.post('/generate-image', aiController.generateImage);

// Анализ тональности текста
router.post('/analyze-sentiment', aiController.analyzeSentiment);

// Генерация краткого описания новости
router.post('/generate-summary', aiController.generateSummary);

module.exports = router;
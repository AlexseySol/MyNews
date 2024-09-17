const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

/**
 * Маршруты для работы с новостями
 * Определяет API эндпоинты для получения, фильтрации и поиска новостей.
 * Использует методы из newsController для обработки запросов.
 */

// Получение всех новостей
router.get('/', newsController.getAllNews);

// Получение новостей из конкретного источника
router.get('/source/:source', newsController.getNewsBySource);

// Поиск новостей по ключевому слову
router.get('/search', newsController.searchNews);

// Получение новостей из RSS
router.get('/rss', (req, res, next) => newsController.getNewsBySource({ params: { source: 'rss' } }, res, next));

module.exports = router;

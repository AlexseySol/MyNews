const rssService = require('../services/rssService');
const githubService = require('../services/githubService');
const huggingfaceService = require('../services/huggingfaceService');
const { MAX_NEWS_PER_PAGE } = require('../config/env');

/**
 * Контроллер для работы с новостями
 * Отвечает за обработку запросов, связанных с получением и фильтрацией новостей.
 * Взаимодействует с различными сервисами для получения данных из разных источников.
 */
const newsController = {
  /**
   * Получение новостей из всех доступных источников
   */
  getAllNews: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || MAX_NEWS_PER_PAGE;

      const rssNews = await rssService.getNews();
      const githubNews = await githubService.getNews();
      const huggingfaceNews = await huggingfaceService.getNews();

      const allNews = [...rssNews, ...githubNews, ...huggingfaceNews]
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedNews = allNews.slice(startIndex, endIndex);

      res.json({
        total: allNews.length,
        page,
        limit,
        news: paginatedNews
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Получение новостей из конкретного источника
   */
  getNewsBySource: async (req, res, next) => {
    try {
      const source = req.params.source || 'rss'; // По умолчанию RSS
      let news;

      switch (source) {
        case 'rss':
          news = await rssService.getNews();
          break;
        case 'github':
          news = await githubService.getNews();
          break;
        case 'huggingface':
          news = await huggingfaceService.getNews();
          break;
        default:
          return res.status(400).json({ message: 'Неизвестный источник новостей' });
      }

      res.json(news);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Поиск новостей по ключевому слову
   */
  searchNews: async (req, res, next) => {
    try {
      const { keyword } = req.query;
      if (!keyword) {
        return res.status(400).json({ message: 'Необходимо указать ключевое слово для поиска' });
      }

      const allNews = [
        ...(await rssService.getNews()),
        ...(await githubService.getNews()),
        ...(await huggingfaceService.getNews())
      ];

      const filteredNews = allNews.filter(news =>
        news.title.toLowerCase().includes(keyword.toLowerCase()) ||
        news.description.toLowerCase().includes(keyword.toLowerCase())
      );

      res.json(filteredNews);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = newsController;

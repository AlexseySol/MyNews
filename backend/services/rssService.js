const axios = require('axios');
const Parser = require('rss-parser');
const { RSS_FEEDS } = require('../config/env');

const parser = new Parser();

/**
 * Сервис для работы с RSS-лентами
 * 
 * Отвечает за получение и парсинг новостей из различных RSS-источников.
 * Использует библиотеку rss-parser для обработки RSS-фидов.
 */
const rssService = {
  /**
   * Получение новостей из всех настроенных RSS-источников
   */
  getNews: async () => {
    try {
      const allNews = [];

      for (const category in RSS_FEEDS) {
        for (const feed of RSS_FEEDS[category]) {
          try {
            const feedContent = await parser.parseURL(feed.url);
            const parsedItems = feedContent.items.map(item => ({
              title: item.title,
              description: item.contentSnippet || item.content,
              link: item.link,
              pubDate: item.pubDate,
              source: feed.name,
              category: category
            }));
            allNews.push(...parsedItems);
          } catch (error) {
            console.error(`Ошибка при парсинге RSS-ленты ${feed.name}: ${error.message}`);
          }
        }
      }

      return allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    } catch (error) {
      throw new Error(`Ошибка при получении новостей из RSS: ${error.message}`);
    }
  },

  /**
   * Получение новостей из конкретного RSS-источника
   */
  getNewsFromSource: async (sourceName) => {
    try {
      const sourceUrl = Object.values(RSS_FEEDS)
        .flat()
        .find(feed => feed.name === sourceName)?.url;

      if (!sourceUrl) {
        throw new Error(`RSS-источник "${sourceName}" не найден`);
      }

      const feedContent = await parser.parseURL(sourceUrl);
      return feedContent.items.map(item => ({
        title: item.title,
        description: item.contentSnippet || item.content,
        link: item.link,
        pubDate: item.pubDate,
        source: sourceName
      }));
    } catch (error) {
      throw new Error(`Ошибка при получении новостей из источника ${sourceName}: ${error.message}`);
    }
  }
};

module.exports = rssService;
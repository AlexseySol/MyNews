const cheerio = require('cheerio');
const { parseString } = require('xml2js');

/**
 * Утилиты для парсинга данных
 * 
 * Этот модуль содержит функции для парсинга различных типов данных,
 * используемых в проекте, таких как RSS-ленты, HTML и JSON.
 */

const parser = {
  /**
   * Парсинг RSS-ленты
   * @param {string} xmlString - Строка с XML содержимым RSS-ленты
   * @returns {Promise<Array>} - Массив объектов с данными из RSS
   */
  parseRSS: (xmlString) => {
    return new Promise((resolve, reject) => {
      parseString(xmlString, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const items = result.rss.channel[0].item;
          const parsedItems = items.map(item => ({
            title: item.title[0],
            description: item.description[0],
            link: item.link[0],
            pubDate: item.pubDate[0],
            guid: item.guid[0]._
          }));
          resolve(parsedItems);
        }
      });
    });
  },

  /**
   * Извлечение текста из HTML
   * @param {string} html - HTML строка
   * @returns {string} - Извлеченный текст
   */
  extractTextFromHTML: (html) => {
    const $ = cheerio.load(html);
    return $.root().text().trim();
  },

  /**
   * Парсинг JSON строки
   * @param {string} jsonString - JSON строка
   * @returns {Object} - Распарсенный объект
   */
  parseJSON: (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Ошибка при парсинге JSON:', error);
      return null;
    }
  },

  /**
   * Извлечение метаданных из HTML
   * @param {string} html - HTML строка
   * @returns {Object} - Объект с метаданными
   */
  extractMetadata: (html) => {
    const $ = cheerio.load(html);
    const metadata = {};

    $('meta').each((i, elem) => {
      const name = $(elem).attr('name') || $(elem).attr('property');
      const content = $(elem).attr('content');
      if (name && content) {
        metadata[name] = content;
      }
    });

    return metadata;
  }
};

module.exports = parser;
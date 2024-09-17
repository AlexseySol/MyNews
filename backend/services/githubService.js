const axios = require('axios');
const { GITHUB_API_KEY, GITHUB_API_URL } = require('../config/env');

/**
 * Сервис для работы с GitHub API
 * 
 * Отвечает за получение новостей и обновлений, связанных с ИИ, из репозиториев GitHub.
 * Использует axios для выполнения HTTP-запросов к GitHub API.
 */
const githubService = {
  /**
   * Получение последних обновлений из репозиториев, связанных с ИИ
   */
  getNews: async () => {
    try {
      const response = await axios.get(`${GITHUB_API_URL}/search/repositories`, {
        params: {
          q: 'topic:artificial-intelligence',
          sort: 'updated',
          order: 'desc'
        },
        headers: {
          'Authorization': `token ${GITHUB_API_KEY}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      return response.data.items.map(repo => ({
        title: repo.name,
        description: repo.description,
        link: repo.html_url,
        pubDate: repo.updated_at,
        source: 'GitHub',
        stars: repo.stargazers_count
      }));
    } catch (error) {
      throw new Error(`Ошибка при получении данных из GitHub: ${error.message}`);
    }
  },

  /**
   * Получение информации о конкретном репозитории
   */
  getRepoInfo: async (owner, repo) => {
    try {
      const response = await axios.get(`${GITHUB_API_URL}/repos/${owner}/${repo}`, {
        headers: {
          'Authorization': `token ${GITHUB_API_KEY}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      return {
        name: response.data.name,
        description: response.data.description,
        stars: response.data.stargazers_count,
        forks: response.data.forks_count,
        lastUpdate: response.data.updated_at
      };
    } catch (error) {
      throw new Error(`Ошибка при получении информации о репозитории: ${error.message}`);
    }
  }
};

module.exports = githubService;
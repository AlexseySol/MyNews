/**
 * Утилиты для форматирования данных
 * 
 * Этот модуль содержит функции для форматирования различных типов данных,
 * используемых в проекте, таких как даты, текст, числа и специальные форматы для Telegram.
 */

const formatter = {
    /**
     * Форматирование даты
     * @param {string|Date} date - Дата для форматирования
     * @param {string} format - Формат вывода (по умолчанию 'DD.MM.YYYY HH:mm')
     * @returns {string} - Отформатированная дата
     */
    formatDate: (date, format = 'DD.MM.YYYY HH:mm') => {
      const d = new Date(date);
      const pad = (num) => num.toString().padStart(2, '0');
  
      const replacements = {
        YYYY: d.getFullYear(),
        MM: pad(d.getMonth() + 1),
        DD: pad(d.getDate()),
        HH: pad(d.getHours()),
        mm: pad(d.getMinutes()),
        ss: pad(d.getSeconds())
      };
  
      return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => replacements[match]);
    },
  
    /**
     * Обрезание текста до определенной длины
     * @param {string} text - Исходный текст
     * @param {number} maxLength - Максимальная длина (по умолчанию 100)
     * @returns {string} - Обрезанный текст
     */
    truncateText: (text, maxLength = 100) => {
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength - 3) + '...';
    },
  
    /**
     * Форматирование числа с разделителями
     * @param {number} number - Число для форматирования
     * @returns {string} - Отформатированное число
     */
    formatNumber: (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  
    /**
     * Форматирование текста для Telegram (с поддержкой HTML тегов)
     * @param {string} text - Исходный текст
     * @returns {string} - Отформатированный текст для Telegram
     */
    formatTelegramMessage: (text) => {
      // Экранирование специальных символов HTML
      text = text.replace(/&/g, '&amp;')
                 .replace(/</g, '&lt;')
                 .replace(/>/g, '&gt;');
  
      // Добавление поддерживаемых Telegram HTML тегов
      text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Жирный текст
                 .replace(/__(.*?)__/g, '<i>$1</i>')     // Курсив
                 .replace(/`(.*?)`/g, '<code>$1</code>') // Моноширинный текст
  
      return text;
    },
  
    /**
     * Генерация слага из текста
     * @param {string} text - Исходный текст
     * @returns {string} - Слаг
     */
    generateSlug: (text) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    },
  
    /**
     * Форматирование размера файла
     * @param {number} bytes - Размер в байтах
     * @returns {string} - Отформатированный размер
     */
    formatFileSize: (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
  };
  
  module.exports = formatter;
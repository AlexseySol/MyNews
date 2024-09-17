/**
 * Утилиты форматирования
 * 
 * Этот модуль содержит функции для форматирования различных типов данных.
 * 
 * Отвечает за:
 * - Форматирование дат
 * - Форматирование текста новостей
 * - Форматирование чисел (например, для статистики)
 */

// Форматирование даты
export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('ru-RU', options);
  };
  
  // Обрезание текста до определенной длины
  export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  // Форматирование числа с разделителями разрядов
  export const formatNumber = (number) => {
    return new Intl.NumberFormat('ru-RU').format(number);
  };
  
  // Форматирование текста новости (пример: удаление HTML-тегов)
  export const cleanNewsContent = (content) => {
    return content.replace(/<\/?[^>]+(>|$)/g, "");
  };
  
  // Преобразование строки в URL-friendly формат
  export const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };
  
  // Дополнительные функции форматирования могут быть добавлены здесь
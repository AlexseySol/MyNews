/**
 * Middleware для обработки ошибок
 * 
 * Этот middleware отвечает за централизованную обработку ошибок в приложении.
 * Он перехватывает все ошибки, логирует их и отправляет соответствующий ответ клиенту.
 */

const errorHandler = (err, req, res, next) => {
    // Логирование ошибки
    console.error('Error:', err);
  
    // Определение статуса ошибки
    const statusCode = err.statusCode || 500;
  
    // Форматирование ответа
    const errorResponse = {
      error: {
        message: err.message || 'Внутренняя ошибка сервера',
        status: statusCode
      }
    };
  
    // Добавление стека ошибки в режиме разработки
    if (process.env.NODE_ENV === 'development') {
      errorResponse.error.stack = err.stack;
    }
  
    // Отправка ответа клиенту
    res.status(statusCode).json(errorResponse);
  };
  
  module.exports = errorHandler;
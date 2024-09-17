const rateLimit = require('express-rate-limit');

/**
 * Middleware для ограничения частоты запросов
 * 
 * Этот middleware использует express-rate-limit для ограничения количества запросов,
 * которые клиент может сделать к API в определенный промежуток времени.
 */

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Ограничить каждый IP до 100 запросов на `windowMs`
  standardHeaders: true, // Возвращать информацию об ограничении в заголовках `RateLimit-*`
  legacyHeaders: false, // Отключить заголовки `X-RateLimit-*`
  message: {
    error: {
      message: 'Слишком много запросов, пожалуйста, повторите попытку позже.',
      status: 429
    }
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message);
  }
});

module.exports = rateLimiter;
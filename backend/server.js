const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { PORT } = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const newsRoutes = require('./routes/news');
const aiRoutes = require('./routes/ai');
const telegramRoutes = require('./routes/telegram');

const app = express();

// Middleware
app.use(helmet()); // Защита от известных уязвимостей
app.use(cors()); // Разрешение CORS (можно настроить под конкретные домены)
app.use(morgan('dev')); // Логирование HTTP-запросов
app.use(express.json()); // Парсинг JSON-данных в теле запроса
app.use(rateLimiter); // Ограничение частоты запросов

// Маршруты
app.use('/api/news', newsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/telegram', telegramRoutes);

// Обработка ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

module.exports = app; // Экспорт для тестирования

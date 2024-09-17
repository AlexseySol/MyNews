import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NewsProvider } from './context/NewsContext';
import { AIProvider } from './context/AIContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NewsSource from './pages/NewsSource';
import NewsProcessing from './pages/NewsProcessing';
import Settings from './pages/Settings';
import './styles/global.css';

/**
 * Корневой компонент приложения App
 * 
 * Этот компонент является основной точкой входа для React-приложения.
 * Он настраивает провайдеры контекста, маршрутизацию и общую структуру приложения.
 * 
 * Компонент App:
 * - Оборачивает приложение в провайдеры NewsProvider и AIProvider
 * - Настраивает маршрутизацию с помощью react-router-dom
 * - Включает в себя компоненты Header и Footer, которые отображаются на всех страницах
 * - Определяет основные маршруты приложения
 */
const App = () => {
  return (
    <NewsProvider>
      <AIProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="app-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sources" element={<NewsSource />} />
                <Route path="/process/:id" element={<NewsProcessing />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AIProvider>
    </NewsProvider>
  );
};

export default App;
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../styles/components/Header.css';

/**
 * Компонент Header
 * 
 * Этот компонент представляет собой верхнюю часть (шапку) всех страниц приложения.
 * 
 * Взаимодействует с:
 * - React Router для навигации по основным разделам приложения
 * - Файлом логотипа из '../assets/logo.svg'
 * 
 * Структура:
 * - Логотип приложения (с ссылкой на главную страницу)
 * - Навигационное меню с основными разделами
 * 
 * Стилизация:
 * - Использует стили из '../styles/components/Header.css'
 */
const Header = () => {
  return (
    <header className="header">
      {/* Логотип и название приложения */}
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="AI News Processor Logo" className="header__logo-image" />
          <span className="header__logo-text">AI News Processor</span>
        </Link>
      </div>

      {/* Навигационное меню */}
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link to="/" className="header__nav-link">Главная</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/sources" className="header__nav-link">Источники</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/processed" className="header__nav-link">Обработанные новости</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/settings" className="header__nav-link">Настройки</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import '../styles/components/Footer.css';

/**
 * Компонент Footer
 * 
 * Этот компонент представляет собой нижнюю часть (подвал) всех страниц приложения.
 * 
 * Взаимодействует с:
 * - React Router для навигации по внутренним страницам
 * - Внешними ссылками на социальные сети
 * 
 * Структура:
 * - Ссылки на дополнительные страницы (О нас, Контакты, Политика конфиденциальности)
 * - Иконки и ссылки на социальные сети
 * - Информация об авторских правах
 * 
 * Стилизация:
 * - Использует стили из '../styles/components/Footer.css'
 */
const Footer = () => {
  return (
    <footer className="footer">
      {/* Ссылки на дополнительные страницы */}
      <div className="footer__links">
        <Link to="/about" className="footer__link">О нас</Link>
        <Link to="/contacts" className="footer__link">Контакты</Link>
        <Link to="/privacy" className="footer__link">Политика конфиденциальности</Link>
      </div>

      {/* Ссылки на социальные сети */}
      <div className="footer__social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
          <FaTwitter />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
          <FaLinkedin />
        </a>
      </div>

      {/* Информация об авторских правах */}
      <div className="footer__copyright">
        © {new Date().getFullYear()} AI News Processor. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
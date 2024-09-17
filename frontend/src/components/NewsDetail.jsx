import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useNews from '../hooks/useNews';
import useAI from '../hooks/useAI';
import '../styles/pages/NewsDetail.css';

/**
 * Компонент NewsDetail
 * 
 * Этот компонент отвечает за отображение детальной информации о выбранной новости.
 * 
 * Функциональность:
 * - Загружает детальную информацию о новости
 * - Отображает оригинальный текст новости
 * - Обрабатывает текст новости с помощью ИИ
 * - Отображает обработанный ИИ текст
 * 
 * Взаимодействует с:
 * - React Router для получения параметров URL
 * - Хуком useNews для получения данных о новости
 * - Хуком useAI для обработки текста новости
 * - Стилями из '../styles/pages/NewsDetail.css'
 * 
 * @returns {JSX.Element} Разметка компонента NewsDetail
 */
const NewsDetail = () => {
  const { source, id } = useParams();
  const { getNewsDetails, loading: newsLoading, error: newsError } = useNews();
  const { processNews, loading: aiLoading, error: aiError } = useAI();
  const [newsDetail, setNewsDetail] = useState(null);
  const [processedContent, setProcessedContent] = useState('');

  // Загрузка детальной информации о новости
  useEffect(() => {
    const fetchNewsDetails = async () => {
      const details = await getNewsDetails(source, id);
      setNewsDetail(details);
    };
    fetchNewsDetails();
  }, [source, id, getNewsDetails]);

  // Обработка текста новости с помощью ИИ
  useEffect(() => {
    if (newsDetail) {
      processNews(newsDetail.content).then(setProcessedContent);
    }
  }, [newsDetail, processNews]);

  if (newsLoading || aiLoading) return <div className="news-detail__loading">Загрузка...</div>;
  if (newsError || aiError) return <div className="news-detail__error">Произошла ошибка при загрузке данных</div>;

  return (
    <div className="news-detail">
      {newsDetail && (
        <>
          <h1 className="news-detail__title">{newsDetail.title}</h1>
          <div className="news-detail__content">
            <h2>Оригинальный текст:</h2>
            <p>{newsDetail.content}</p>
          </div>
          <div className="news-detail__processed">
            <h2>Обработанный ИИ текст:</h2>
            <p>{processedContent}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsDetail;
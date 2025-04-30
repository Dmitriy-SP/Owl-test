import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await api.get(`/api/v2/products?_quantity=50`);
      const found = res.data.data.find(item => item.id === parseInt(id));
      setArticle(found);
    };
    fetchArticle();
  }, [id]);

  if (!article) return <div className="text-center mt-5">Загрузка...</div>;

  return (
    <div className="container">
      <h2>{article.name}</h2>
      <p><strong>Описание:</strong> {article.description}</p>
      <p><strong>Цена:</strong> {article.price} {article.taxes}</p>
      <p><strong>Наличие:</strong> {article.available ? 'Да' : 'Нет'}</p>
      <img src={article.image} alt={article.name} className="img-fluid" />
    </div>
  );
};

export default ArticleDetailPage;

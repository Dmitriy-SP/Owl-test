import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const { articles, loading, error } = useSelector(state => state.articles);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Ошибка: {error}</Alert>
      </Container>
    );
  }

  const article = articles.find(item => String(item.id) === id);

  return (
    <Container className="py-4">
      <Card>
        <Card.Img variant="top" src={article.image} />
        <Card.Body>
          <Card.Title>{article.name}</Card.Title>
          <Card.Text>
            <strong>Описание:</strong> {article.description}
          </Card.Text>
          <Card.Text>
            <strong>Цена:</strong> {article.price} {article.taxes}
          </Card.Text>
          <Card.Text>
            <strong>Наличие:</strong> {article.available ? 'Да' : 'Нет'}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ArticleDetailPage;

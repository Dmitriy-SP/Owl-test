import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, resetSearch } from '../redux/articleSlice';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Pagination,
  Spinner,
  Alert,
  InputGroup,
  Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const { articles, searchTerm, loading, error } = useSelector((state) => state.articles);

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const filtered = articles.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const last = currentPage * articlesPerPage;
  const first = last - articlesPerPage;
  const pageItems = filtered.slice(first, last);
  const totalPages = Math.ceil(filtered.length / articlesPerPage);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
    setCurrentPage(1);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Список статей</h2>
      <InputGroup className="mb-4">
        <Form.Control
          type="text"
          placeholder="Поиск по названию"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button variant="outline-secondary" onClick={() => dispatch(resetSearch())}>
          Сбросить
        </Button>
      </InputGroup>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <>
          <Row>
            {pageItems.map((article) => (
              <Col key={article.id} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{article.name}</Card.Title>
                    <Card.Text>
                      {article.description.substring(0, 100)}...
                    </Card.Text>
                    <Link to={`/articles/${article.id}`} className="btn btn-success">
                      Подробнее
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-4">
              {[...Array(totalPages)].map((_, idx) => (
                <Pagination.Item
                  key={idx + 1}
                  active={idx + 1 === currentPage}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </>
      )}
    </Container>
  );
};

export default ArticlesPage;

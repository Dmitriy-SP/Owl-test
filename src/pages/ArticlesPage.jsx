import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticles } from '../redux/articleSlice';
import { Link } from 'react-router-dom';

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.articles);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const filteredArticles = list.filter(article =>
    article.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2 className="mb-4">Статьи</h2>
      <input
        type="text"
        placeholder="Поиск статей..."
        className="form-control mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="row">
        {currentArticles.map(article => (
          <div className="col-md-6 mb-3" key={article.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{article.name}</h5>
                <p className="card-text">{article.description.slice(0, 100)}...</p>
                <Link to={`/articles/${article.id}`} className="btn btn-primary">Подробнее</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map(num => (
            <li key={num} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(num + 1)}>
                {num + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ArticlesPage;

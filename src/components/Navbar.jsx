import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Главная</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Статьи</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Обратная связь</Link>
            </li>
              <li className="nav-item">
                <Link className="btn btn-outline-light ms-2" to="/">Войти</Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

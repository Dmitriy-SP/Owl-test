import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
      </Routes>
    </>
  );
};

export default App;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { fetchArticles } from './redux/articleSlice';
import ContactFormPage from './pages/ContactFormPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import UserProfilePage from './pages/UserProfilePage';
import Navbar from './components/Navbar';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchArticles());
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/contact" element={<ContactFormPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </>
  );
};

export default App;

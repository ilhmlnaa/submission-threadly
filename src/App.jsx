import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { changeLanguage } from './utils/i18n';
import { Loading } from './components';
import { MainLayout, AuthLayout } from './layouts';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import NotFoundPage from './pages/NotFoundPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { setThemeActionCreator } from './states/theme/action';
import { setLanguageActionCreator } from './states/language/action';

function App() {
  const {
    authUser = null,
    isPreload = false,
    theme = 'dark',
    language = 'en',
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLanguage = localStorage.getItem('language') || 'en';

    dispatch(setThemeActionCreator(savedTheme));

    if (savedLanguage !== language) {
      dispatch(setLanguageActionCreator(savedLanguage));
      changeLanguage(savedLanguage);
    }
  }, [dispatch, language]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Toaster />
      <Loading />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/threads/:id" element={<MainLayout />}>
          <Route index element={<DetailPage />} />
        </Route>
        <Route path="/leaderboards" element={<MainLayout />}>
          <Route index element={<LeaderboardsPage />} />
        </Route>
        {!authUser && (
          <>
            <Route path="/login" element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
            </Route>
            <Route path="/register" element={<AuthLayout />}>
              <Route index element={<RegisterPage />} />
            </Route>
          </>
        )}
        <Route path="*" element={<MainLayout />}>
          <Route index element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

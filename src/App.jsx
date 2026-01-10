import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { changeLanguage } from './utils/i18n';
import { Navigation, Loading, Footer } from './components';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import NotFoundPage from './pages/NotFoundPage';
import { asyncPreloadProcess } from './states/shared/action';
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
  const location = useLocation();

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

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
        {!isAuthPage && (
          <Navigation authUser={authUser} theme={theme} language={language} />
        )}
        <Loading />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/threads/:id" element={<DetailPage />} />
              <Route path="/leaderboards" element={<LeaderboardsPage />} />
              {!authUser && (
                <>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </>
              )}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        {!isAuthPage && <Footer />}
      </div>
    </>
  );
}

export default App;

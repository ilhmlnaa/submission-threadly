import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Trophy,
  LogOut,
  Moon,
  Sun,
  LogIn,
  Loader2,
  Menu,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { asyncLogoutUser } from '../../states/shared/action';
import { toggleThemeActionCreator } from '../../states/theme/action';
import { LanguageSwitcher } from '../common';

function Navigation({ authUser, theme }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const onLogout = () => {
    setIsLoggingOut(true);
    setIsOpen(false);
    setTimeout(() => {
      dispatch(asyncLogoutUser());
      navigate('/');
      setIsLoggingOut(false);
    }, 600);
  };

  const onToggleTheme = () => {
    dispatch(toggleThemeActionCreator());
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-500 hover:opacity-80 transition-opacity"
            >
              {t('navigation.forumApp')}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex ml-10 space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>{t('navigation.home')}</span>
              </Link>
              <Link
                to="/leaderboards"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Trophy className="w-5 h-5" />
                <span>{t('navigation.leaderboards')}</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Desktop and Mobile Shared Icons (Theme) */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={onToggleTheme}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>

              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {authUser && (
                <div className="flex items-center ml-2">
                  <img
                    src={authUser.avatar}
                    alt={authUser.name}
                    className="w-8 h-8 rounded-full border-2 border-blue-500"
                  />
                  <span className="hidden lg:inline ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {authUser.name}
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Auth and Language Buttons */}
            <div className="hidden md:flex items-center space-x-4 ml-4">
              {authUser ? (
                <motion.button
                  whileHover={{ scale: isLoggingOut ? 1 : 1.05 }}
                  whileTap={{ scale: isLoggingOut ? 1 : 0.95 }}
                  type="button"
                  onClick={onLogout}
                  disabled={isLoggingOut}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <LogOut className="w-5 h-5" />
                  )}
                  <span>
                    {isLoggingOut
                      ? t('navigation.loggingOut')
                      : t('navigation.logout')}
                  </span>
                </motion.button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                  <LogIn className="w-5 h-5" />
                  <span>{t('navigation.login')}</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={toggleMenu}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 right-0 bottom-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-xl md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
                <span className="font-bold text-blue-600 dark:text-blue-500">
                  Menu
                </span>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
                <Link
                  to="/"
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 p-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-500 transition-all"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">{t('navigation.home')}</span>
                </Link>

                <Link
                  to="/leaderboards"
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 p-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-500 transition-all"
                >
                  <Trophy className="w-5 h-5" />
                  <span className="font-medium">
                    {t('navigation.leaderboards')}
                  </span>
                </Link>

                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
                  <LanguageSwitcher />

                  {authUser ? (
                    <button
                      onClick={onLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-50"
                    >
                      {isLoggingOut ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <LogOut className="w-5 h-5" />
                      )}
                      <span className="font-medium">
                        {isLoggingOut
                          ? t('navigation.loggingOut')
                          : t('navigation.logout')}
                      </span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={toggleMenu}
                      className="flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
                    >
                      <LogIn className="w-5 h-5" />
                      <span>{t('navigation.login')}</span>
                    </Link>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Threadly v1.0.0
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  theme: PropTypes.string.isRequired,
};

Navigation.defaultProps = {
  authUser: null,
};

export default Navigation;

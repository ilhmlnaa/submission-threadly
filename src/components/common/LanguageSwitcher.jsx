import React from 'react';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../utils/i18n';

function LanguageSwitcher() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language || 'en';

  const onToggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'id' : 'en';
    changeLanguage(newLanguage);
    dispatch({ type: 'SET_LANGUAGE', payload: { language: newLanguage } });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="button"
      onClick={onToggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={t('language.switchLanguage')}
      title={currentLanguage === 'en' ? t('language.indonesian') : t('language.english')}
    >
      <Languages className="w-5 h-5" />
      <span className="hidden sm:inline font-medium text-sm">
        {currentLanguage === 'en' ? 'EN' : 'ID'}
      </span>
      <span className="sm:hidden font-medium text-sm">
        {currentLanguage === 'en' ? 'EN' : 'ID'}
      </span>
    </motion.button>
  );
}

export default LanguageSwitcher;

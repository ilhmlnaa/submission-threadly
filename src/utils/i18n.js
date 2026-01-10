import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en.json';
import idTranslations from '../locales/id.json';

const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      id: {
        translation: idTranslations,
      },
    },
    fallbackLng: 'en',
    lng: savedLanguage,
    interpolation: {
      escapeValue: false,
    },
  });

window.addEventListener('storage', (e) => {
  if (e.key === 'language' && e.newValue) {
    i18n.changeLanguage(e.newValue);
  }
});

export const changeLanguage = (lang) => {
  localStorage.setItem('language', lang);
  i18n.changeLanguage(lang);
};

export default i18n;

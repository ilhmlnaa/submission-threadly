import React, { Suspense, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useDarkMode } from 'storybook-dark-mode';
import i18n from '../src/utils/i18n';
import '../src/index.css';

/** @type { import('@storybook/react-vite').Preview } */
const WithI18n = (Story, context) => {
  const { locale } = context.globals;
  const isDarkMode = useDarkMode();

  useEffect(() => {
    i18n.changeLanguage(locale || 'en');
  }, [locale]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'id', right: '🇮🇩', title: 'Indonesia' },
      ],
    },
  },
};

export const decorators = [WithI18n];

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      classTarget: 'html',
      stylePreview: true,
    },
  },
};

export default preview;

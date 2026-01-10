import '@testing-library/jest-dom';
import { vi } from 'vitest';
import i18n from '../utils/i18n';

global.i18n = i18n;

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

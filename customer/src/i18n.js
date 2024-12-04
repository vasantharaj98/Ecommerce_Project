// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import taTranslation from './locales/ta.json';

const resources = {
  EN: {
    translation: enTranslation,
  },
  TA: {
    translation: taTranslation,
  },
};

const ln = localStorage.getItem("ln");

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "EN", // Default language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;

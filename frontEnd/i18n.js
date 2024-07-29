import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 引入翻译文件
import translationEN from './locales/en/translation.json';
import translationZH from './locales/zh/translation.json';
import translationSpanish from './locales/spanish/tranlation.json';

const resources = {
  en: {
    translation: translationEN
  },
  zh: {
    translation: translationZH
  },
  spanish: {
    translation: translationSpanish
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // 默认语言
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;

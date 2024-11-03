//src/i18n.js
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import zh from './locales/zh.json';

const messages = {
  en,
  zh
};

// 設定初始語言，優先從 localStorage 中讀取
const locale = localStorage.getItem('language') || 'zh';

const i18n = createI18n({
  locale,
  fallbackLocale: 'en',
  messages,
  globalInjection: true,
  legacy: false // 如果您使用组合式 API，需要设置为 false
});

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en-US.json';
import translationIT from './locales/it.json';
import translationPTBR from './locales/pt-BR.json';

export function resolveLanguage(environmentLanguage: string | undefined, hostname: string): string {
  if (environmentLanguage) {
    return environmentLanguage;
  }
  if (hostname.includes('.com.br')) {
    return 'pt-BR';
  }
  if (hostname.includes('.com')) {
    return 'en-US';
  }
  if (hostname.endsWith('.it')) {
    return 'it';
  }
  return 'en-US';
}

void i18n.use(initReactI18next).init({
  resources: {
    'en-US': {
      translation: translationEN,
    },
    'pt-BR': {
      translation: translationPTBR,
    },
    it: {
      translation: translationIT,
    },
  },
  lng: resolveLanguage(import.meta.env.VITE_REACT_APP_LANGUAGE, window.location.hostname),
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en-US.json';
import translationPTBR from './locales/pt-BR.json';
import translationIT from './locales/it.json';

const environmentLanguage = import.meta.env.VITE_REACT_APP_LANGUAGE;
const hostname = window.location.hostname;
let language;

if (environmentLanguage) {
  language = environmentLanguage;
} else {
  if (hostname.includes('.com.br')) {
    language = 'pt-BR';
  } else if (hostname.includes('.com')) {
    language = 'en-US';
  } else if (hostname.endsWith('.it')) {
    language = 'it';
  } else {
    language = 'en-US';
  }
}

console.log("Language set to:", language);
console.log("Hostname set to:", hostname);

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      'pt-BR': {
        translation: translationPTBR
      },
      it: {
        translation: translationIT
      }
    },
    lng: language,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;

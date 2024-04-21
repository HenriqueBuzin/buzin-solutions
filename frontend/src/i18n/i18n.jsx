import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// Ajuste para usar import.meta.env se estiver usando Vite
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
    language = 'en-US'; // Default for other cases
  }
}

console.log("Language set to:", language);

i18n
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    lng: language,
    fallbackLng: "en-US",
    backend: {
      loadPath: '/src/i18n/locales/{{lng}}.json'
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;

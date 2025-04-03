import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const MYMEMORY_API_BASE = 'https://api.mymemory.translated.net/get';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fr'],
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: { 
      escapeValue: false 
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
      lookupQuerystring: 'lang',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
    },
    backend: {
      loadPath: (lng: string, ns: string) => `/locales/${lng}.json`,
      request: async (
        _options: unknown,
        _url: string,
        payload: { key: string },
        callback: (error: Error | null, data: { data: Record<string, string> } | null) => void
      ) => {
        if (!payload?.key) {
          callback(new Error('No translation key provided'), null);
          return;
        }

        const text = encodeURIComponent(payload.key);
        const langPair = `${i18n.language}|en`;

        try {
          const response = await fetch(`${MYMEMORY_API_BASE}?q=${text}&langpair=${langPair}`);
          const data = await response.json();

          if (data.responseData?.translatedText) {
            callback(null, { data: { [payload.key]: data.responseData.translatedText } });
          } else {
            callback(new Error('Translation API returned no data'), null);
          }
        } catch (error) {
          console.error('Translation API error:', error);
          callback(error as Error, null);
        }
      },
    },
  });

export default i18n;
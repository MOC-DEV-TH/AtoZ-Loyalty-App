import en from "../locales/en";
import my from "../locales/my";

const translations = {
  en: en,
  my: my,
};

const currentLanguage = "en"; // change to "my" for test

const i18n = {
  locale: currentLanguage,
  t: (key) => {
    const langData = translations[currentLanguage] || translations.en;
    return langData[key] || key;
  },
};

export default i18n;
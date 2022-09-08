import my from "../locales/my";
import en from "../locales/en";
import chn from "../locales/chn";
import { I18n } from 'i18n-js';

const i18n = new I18n()
i18n.fallbacks = true;
i18n.translations = {  
  en: en,
  my: my,
  chn: chn
};

export const changeLanguage = lang => {
  if (lang) {
    I18n.locale = lang;
  }
}

export default i18n;  
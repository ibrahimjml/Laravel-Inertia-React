
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@lang/en";
import ar from "@lang/ar";

i18n
  .use(initReactI18next) 
  .init({
  
    resources: {
      en: {  translation: en.en  },
      ar: {  translation: ar.ar  }
    },
    lng: localStorage.getItem('i18nextLng') || 'en', 
    fallbackLng: "en",

    interpolation: {
      escapeValue: false ,
      prefix: "{", 
      suffix: "}",
    }
  });
export const setLocale = (locale) => {
      i18n.changeLanguage(locale);
    
};
export default i18n;


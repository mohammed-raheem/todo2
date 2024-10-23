import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLang from "./locals/en/en.json";
import arLang from "./locals/ar/ar.json";

const resources = {
  en: {
    translation: enLang,
  },
  ar: {
    translation: arLang,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
  document.dir = i18n.dir();
});

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import usTranslations from "./en.json";
import krTranslations from "./ko.json";
// import jpTranslations from "./ja.json";

const resources = {
  en: {
    translation: usTranslations,
  },
  ko: {
    translation: krTranslations,
  },
  // jp: {
  //   translation: jpTranslations,
  // },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  fallbackLng: "ko",
  debug: true,
  interpolation: { escapeValue: true },
  returnObjects: true,
  returnEmptyString: true,
  returnNull: true,
});

export default i18n;

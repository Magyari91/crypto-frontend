"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { setFormatterLocale } from "../utils/formatters";
import { LANGUAGE_LOCALES, messages, SUPPORTED_LANGUAGES } from "./messages";

const STORAGE_KEY = "cryptovision-language";
const DEFAULT_LANGUAGE = "hu";

const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  locale: LANGUAGE_LOCALES[DEFAULT_LANGUAGE],
  copy: messages[DEFAULT_LANGUAGE],
  setLanguage: () => {},
});

function normalizeLanguage(value) {
  const shortCode = String(value || "").toLowerCase().split("-")[0];
  return SUPPORTED_LANGUAGES.includes(shortCode) ? shortCode : DEFAULT_LANGUAGE;
}

function applyDocumentLanguage(language) {
  setFormatterLocale(LANGUAGE_LOCALES[language]);
  if (typeof document !== "undefined") {
    document.documentElement.lang = language;
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);

  const setLanguage = useCallback((nextLanguage) => {
    const normalized = normalizeLanguage(nextLanguage);
    applyDocumentLanguage(normalized);
    window.localStorage.setItem(STORAGE_KEY, normalized);
    setLanguageState(normalized);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const preferred = stored || window.navigator.language;
    const normalized = normalizeLanguage(preferred);
    applyDocumentLanguage(normalized);
    if (normalized !== DEFAULT_LANGUAGE) setLanguageState(normalized);
  }, []);

  const value = useMemo(
    () => ({
      language,
      locale: LANGUAGE_LOCALES[language],
      copy: messages[language],
      setLanguage,
    }),
    [language, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

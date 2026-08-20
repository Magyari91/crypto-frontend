"use client";

import React from "react";
import { FiGlobe } from "react-icons/fi";
import { useLanguage } from "../i18n/LanguageContext";

export default function LanguageSwitcher({ compact = false }) {
  const { copy, language, setLanguage } = useLanguage();

  return (
    <label
      className={`language-switcher ${compact ? "compact" : ""}`}
      title={copy.language.label}
    >
      <FiGlobe aria-hidden="true" />
      <span className="sr-only">{copy.language.label}</span>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        aria-label={copy.language.label}
      >
        <option value="hu">HU</option>
        <option value="en">EN</option>
      </select>
    </label>
  );
}

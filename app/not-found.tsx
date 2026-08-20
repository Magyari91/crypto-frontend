"use client";

import Link from "next/link";
import LanguageSwitcher from "../src/components/LanguageSwitcher";
import { useLanguage } from "../src/i18n/LanguageContext";

export default function NotFound() {
  const { copy } = useLanguage();
  return (
    <main className="not-found-page">
      <LanguageSwitcher />
      <span className="eyebrow">404</span>
      <h1>{copy.notFound.title}</h1>
      <p>{copy.notFound.description}</p>
      <Link className="primary-button" href="/">
        {copy.notFound.back}
      </Link>
    </main>
  );
}

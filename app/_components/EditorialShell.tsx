"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { CONTACT_EMAIL, OPERATOR_NAME } from "../../src/config/site";
import LanguageSwitcher from "../../src/components/LanguageSwitcher";
import { useLanguage } from "../../src/i18n/LanguageContext";

type EditorialShellProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
};

export default function EditorialShell({ eyebrow, title, lead, children }: EditorialShellProps) {
  const { copy } = useLanguage();
  return (
    <div className="editorial-shell">
      <header className="editorial-header">
        <Link className="brand" href="/" aria-label={copy.nav.home}>
          <span className="brand-mark">CV</span>
          <span>
            <strong>CryptoVision</strong>
            <small>Forecast desk</small>
          </span>
        </Link>
        <div className="editorial-header-actions">
          <nav aria-label={copy.editorial.navigation}>
            <Link href="/">{copy.editorial.dashboard}</Link>
            <Link href="/market">{copy.editorial.market}</Link>
            <Link href="/forecast/bitcoin">{copy.editorial.forecast}</Link>
            <Link href="/methodology">{copy.editorial.methodology}</Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="editorial-main">
        <header className="editorial-title">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{lead}</p>
        </header>
        <article className="editorial-content">{children}</article>
      </main>

      <footer className="editorial-footer">
        <span>{OPERATOR_NAME}</span>
        {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>}
        <Link href="/about">{copy.editorial.about}</Link>
        <Link href="/privacy">{copy.editorial.privacy}</Link>
        <Link href="/cookies">{copy.editorial.cookies}</Link>
        <Link href="/terms">{copy.editorial.terms}</Link>
      </footer>
    </div>
  );
}

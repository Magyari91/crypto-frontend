import Link from "next/link";
import type { ReactNode } from "react";
import { CONTACT_EMAIL, OPERATOR_NAME } from "../../src/config/site";

type EditorialShellProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
};

export default function EditorialShell({ eyebrow, title, lead, children }: EditorialShellProps) {
  return (
    <div className="editorial-shell">
      <header className="editorial-header">
        <Link className="brand" href="/" aria-label="CryptoVision kezdőlap">
          <span className="brand-mark">CV</span>
          <span>
            <strong>CryptoVision</strong>
            <small>Forecast desk</small>
          </span>
        </Link>
        <nav aria-label="Oldal navigáció">
          <Link href="/">Dashboard</Link>
          <Link href="/market">Piac</Link>
          <Link href="/forecast/bitcoin">Előrejelzés</Link>
          <Link href="/methodology">Módszertan</Link>
        </nav>
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
        <Link href="/about">A projektről</Link>
        <Link href="/privacy">Adatvédelem</Link>
        <Link href="/cookies">Cookie-k</Link>
        <Link href="/terms">Feltételek</Link>
      </footer>
    </div>
  );
}

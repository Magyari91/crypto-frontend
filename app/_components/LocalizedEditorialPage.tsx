"use client";

import { CONTACT_EMAIL, OPERATOR_NAME } from "../../src/config/site";
import { editorialContent } from "../../src/i18n/editorialContent";
import { useLanguage } from "../../src/i18n/LanguageContext";
import { useLocalizedDocumentTitle } from "../../src/i18n/useLocalizedDocumentTitle";
import EditorialShell from "./EditorialShell";

type EditorialPageKey = "about" | "methodology" | "privacy" | "cookies" | "terms";

type EditorialSection = {
  title: string;
  paragraphs: string[];
  kind?: "controller";
};

type EditorialPage = {
  eyebrow: string;
  title: string;
  lead: string;
  sections: EditorialSection[];
  contact?: string;
  contactPending?: string;
};

export default function LocalizedEditorialPage({ pageKey }: { pageKey: EditorialPageKey }) {
  const { language } = useLanguage();
  const localeKey: keyof typeof editorialContent = language === "en" ? "en" : "hu";
  const page = editorialContent[localeKey][pageKey] as EditorialPage;
  useLocalizedDocumentTitle(`${page.title} | CryptoVision`);

  return (
    <EditorialShell eyebrow={page.eyebrow} title={page.title} lead={page.lead}>
      {page.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.kind === "controller" && (
            <>
              <p>{OPERATOR_NAME}</p>
              {CONTACT_EMAIL ? (
                <p>
                  {page.contact}: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </p>
              ) : (
                <p>{page.contactPending}</p>
              )}
            </>
          )}
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
    </EditorialShell>
  );
}

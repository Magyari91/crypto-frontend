"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const STORAGE_KEY = "cryptovision-consent-v1";
const ConsentContext = createContext({ analytics: false, advertising: false });

function readStoredConsent() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value);
    return {
      analytics: parsed.analytics === true,
      advertising: parsed.advertising === true,
    };
  } catch (_error) {
    return null;
  }
}

export function useConsent() {
  return useContext(ConsentContext);
}

function ConsentPanel({ existingConsent, onSave, onClose }) {
  const { copy } = useLanguage();
  const [analytics, setAnalytics] = useState(existingConsent?.analytics === true);
  const [advertising, setAdvertising] = useState(existingConsent?.advertising === true);

  return (
    <section className="consent-panel" role="dialog" aria-labelledby="consent-title">
      <div className="consent-copy">
        <div className="consent-copy-heading">
          <span className="eyebrow">{copy.consent.eyebrow}</span>
          <LanguageSwitcher compact />
        </div>
        <h2 id="consent-title">{copy.consent.title}</h2>
        <p>{copy.consent.description}</p>
        <a href="/cookies">{copy.consent.details}</a>
      </div>

      <div className="consent-options">
        <label className="consent-option locked">
          <span>
            <strong>{copy.consent.necessary}</strong>
            <small>{copy.consent.necessaryDetail}</small>
          </span>
          <input type="checkbox" checked disabled />
        </label>
        <label className="consent-option">
          <span>
            <strong>{copy.consent.analytics}</strong>
            <small>{copy.consent.analyticsDetail}</small>
          </span>
          <input
            type="checkbox"
            checked={analytics}
            onChange={(event) => setAnalytics(event.target.checked)}
          />
        </label>
        <label className="consent-option">
          <span>
            <strong>{copy.consent.advertising}</strong>
            <small>{copy.consent.advertisingDetail}</small>
          </span>
          <input
            type="checkbox"
            checked={advertising}
            onChange={(event) => setAdvertising(event.target.checked)}
          />
        </label>
      </div>

      <div className="consent-actions">
        <button type="button" className="secondary-button" onClick={() => onSave(false, false)}>
          {copy.consent.rejectAll}
        </button>
        {existingConsent && (
          <button type="button" className="secondary-button" onClick={onClose}>
            {copy.consent.cancel}
          </button>
        )}
        <button type="button" className="primary-button" onClick={() => onSave(analytics, advertising)}>
          {copy.consent.saveSelected}
        </button>
        <button type="button" className="primary-button" onClick={() => onSave(true, true)}>
          {copy.consent.acceptAll}
        </button>
      </div>
    </section>
  );
}

export default function ConsentManager({ children }) {
  const [consent, setConsent] = useState(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setConsent(readStoredConsent());
    setReady(true);

    const openSettings = () => setSettingsOpen(true);
    window.addEventListener("cryptovision:privacy", openSettings);
    return () => window.removeEventListener("cryptovision:privacy", openSettings);
  }, []);

  const value = useMemo(
    () => consent || { analytics: false, advertising: false },
    [consent]
  );

  const saveConsent = (analytics, advertising) => {
    const nextConsent = { analytics, advertising };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConsent));
    setConsent(nextConsent);
    setSettingsOpen(false);
  };

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {ready && (!consent || settingsOpen) && (
        <div className="consent-layer">
          <ConsentPanel
            existingConsent={consent}
            onSave={saveConsent}
            onClose={() => setSettingsOpen(false)}
          />
        </div>
      )}
    </ConsentContext.Provider>
  );
}

"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

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
  const [analytics, setAnalytics] = useState(existingConsent?.analytics === true);
  const [advertising, setAdvertising] = useState(existingConsent?.advertising === true);

  return (
    <section className="consent-panel" role="dialog" aria-labelledby="consent-title">
      <div className="consent-copy">
        <span className="eyebrow">Adatvédelmi beállítások</span>
        <h2 id="consent-title">Te döntöd el, mi tölthető be</h2>
        <p>
          A szükséges helyi tárolás működteti a témát és a beállításokat. A mérési és
          hirdetési szolgáltatások csak a hozzájárulásod után indulnak el.
        </p>
        <a href="/cookies">Részletes cookie-tájékoztató</a>
      </div>

      <div className="consent-options">
        <label className="consent-option locked">
          <span>
            <strong>Szükséges</strong>
            <small>Alapműködés és választott beállítások</small>
          </span>
          <input type="checkbox" checked disabled />
        </label>
        <label className="consent-option">
          <span>
            <strong>Mérés</strong>
            <small>Névtelen használati és teljesítménymérés</small>
          </span>
          <input
            type="checkbox"
            checked={analytics}
            onChange={(event) => setAnalytics(event.target.checked)}
          />
        </label>
        <label className="consent-option">
          <span>
            <strong>Hirdetések</strong>
            <small>Hirdetési szolgáltatások és kapcsolódó tárolás</small>
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
          Mind elutasítása
        </button>
        {existingConsent && (
          <button type="button" className="secondary-button" onClick={onClose}>
            Mégse
          </button>
        )}
        <button type="button" className="primary-button" onClick={() => onSave(analytics, advertising)}>
          Kiválasztottak mentése
        </button>
        <button type="button" className="primary-button" onClick={() => onSave(true, true)}>
          Mind elfogadása
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

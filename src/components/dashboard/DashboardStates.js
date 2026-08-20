import React from "react";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { useLanguage } from "../../i18n/LanguageContext";

export function LoadingDashboard() {
  const { copy } = useLanguage();
  return (
    <div className="loading-dashboard" aria-label={copy.states.loading} aria-busy="true">
      <div className="loading-band" />
      <div className="loading-grid">
        <div />
        <div />
      </div>
      <div className="loading-band tall" />
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  const { copy } = useLanguage();
  return (
    <section className="error-state" role="alert">
      <FiAlertCircle aria-hidden="true" />
      <div>
        <h2>{copy.states.unavailable}</h2>
        <p>{message}</p>
      </div>
      <button type="button" onClick={onRetry}>
        <FiRefreshCw aria-hidden="true" />
        {copy.states.retry}
      </button>
    </section>
  );
}

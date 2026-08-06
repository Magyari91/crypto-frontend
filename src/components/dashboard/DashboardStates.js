import React from "react";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export function LoadingDashboard() {
  return (
    <div className="loading-dashboard" aria-label="Adatok betöltése" aria-busy="true">
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
  return (
    <section className="error-state" role="alert">
      <FiAlertCircle aria-hidden="true" />
      <div>
        <h2>Az adatok most nem érhetők el</h2>
        <p>{message}</p>
      </div>
      <button type="button" onClick={onRetry}>
        <FiRefreshCw aria-hidden="true" />
        Újrapróbálás
      </button>
    </section>
  );
}

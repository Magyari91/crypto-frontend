import React from "react";
import { FiRefreshCw, FiSliders } from "react-icons/fi";
import { ANALYZED_COINS } from "../../config/coins";
import { useLanguage } from "../../i18n/LanguageContext";

function riskLabel(value, copy) {
  if (value <= 3) return copy.controls.cautious;
  if (value <= 7) return copy.controls.balanced;
  return copy.controls.highTolerance;
}

function DashboardControls({
  coin,
  onCoinChange,
  horizon,
  onHorizonChange,
  risk,
  onRiskChange,
  supportedCoins,
  refreshing,
  onRefresh,
}) {
  const { copy } = useLanguage();
  const coins = supportedCoins?.length ? supportedCoins : ANALYZED_COINS;

  return (
    <section className="control-bar" aria-label={copy.controls.settings}>
      <div className="asset-switcher" aria-label={copy.controls.chooseAsset}>
        {coins.map((item) => (
          <button
            type="button"
            key={item.id}
            className={coin === item.id ? "active" : ""}
            aria-pressed={coin === item.id}
            onClick={() => onCoinChange(item.id)}
            title={item.name}
          >
            {item.symbol}
          </button>
        ))}
      </div>

      <label className="control-field">
        <span>{copy.controls.horizon}</span>
        <select value={horizon} onChange={(event) => onHorizonChange(Number(event.target.value))}>
          <option value={1}>{copy.controls.hours24}</option>
          <option value={7}>{copy.controls.days7}</option>
          <option value={30}>{copy.controls.days30}</option>
        </select>
      </label>

      <label className="risk-control">
        <span className="risk-label">
          <FiSliders aria-hidden="true" />
          {copy.controls.riskProfile}
        </span>
        <input
          type="range"
          min="1"
          max="10"
          value={risk}
          onChange={(event) => onRiskChange(Number(event.target.value))}
        />
        <strong>{riskLabel(risk, copy)}</strong>
      </label>

      <button
        type="button"
        className="icon-button refresh-button"
        onClick={onRefresh}
        aria-label={copy.controls.refresh}
        title={copy.controls.refresh}
        disabled={refreshing}
      >
        <FiRefreshCw className={refreshing ? "spin" : ""} aria-hidden="true" />
      </button>
    </section>
  );
}

export default DashboardControls;

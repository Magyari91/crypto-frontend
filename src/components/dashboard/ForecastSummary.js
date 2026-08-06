import React from "react";
import { FiArrowDownRight, FiArrowUpRight, FiMinus, FiTarget } from "react-icons/fi";
import { formatPercent, formatPrice, formatUpdatedAt } from "../../utils/formatters";

const directions = {
  bullish: { label: "Emelkedő", icon: FiArrowUpRight },
  bearish: { label: "Csökkenő", icon: FiArrowDownRight },
  neutral: { label: "Semleges", icon: FiMinus },
};

function ForecastSummary({ selected, generatedAt }) {
  const forecast = selected.forecast;
  const direction = directions[forecast.direction_key] || directions.neutral;
  const DirectionIcon = direction.icon;
  const positive = selected.change_24h >= 0;
  const interval = forecast.prediction_interval;
  const probability = forecast.probability_forecast;
  const probabilityValue = probability?.probability_pct ?? forecast.confidence;
  const probabilityLabel = probability?.event?.formula || forecast.confidence_label;
  const probabilityDetail = probability
    ? probability.active
      ? `${probability.decision.label} · kalibrált modell`
      : probability.candidate_probability_pct == null
        ? "Historikus alapesély · adatgyűjtés"
        : `Historikus alapesély · jelölt: ${formatPercent(probability.candidate_probability_pct)}`
    : forecast.confidence_label;

  return (
    <section className={`forecast-summary ${forecast.direction_key}`} id="forecast">
      <div className="asset-identity">
        <img src={selected.image} alt="" />
        <div>
          <span>{selected.symbol}</span>
          <h2>{selected.name}</h2>
          <p className={positive ? "positive" : "negative"}>
            {formatPercent(selected.change_24h, true)} az elmúlt 24 órában
          </p>
        </div>
      </div>

      <div className="current-price">
        <small>Aktuális ár</small>
        <strong>{formatPrice(selected.current_price)}</strong>
        <span>Frissítve: {formatUpdatedAt(generatedAt)}</span>
      </div>

      <div className="forecast-direction">
        <div className="direction-heading">
          <DirectionIcon aria-hidden="true" />
          <span>{direction.label}</span>
        </div>
        <strong>{formatPercent(forecast.expected_change_pct, true)}</strong>
        <small>
          {forecast.horizon_days} napos {forecast.specialist?.active ? "hibrid" : "védett"} modelljelzés
        </small>
      </div>

      <div className="forecast-target">
        <FiTarget aria-hidden="true" />
        <span>
          <small>Kalibrált célérték</small>
          <strong>{formatPrice(forecast.target_price)}</strong>
          {interval && (
            <em>
              {interval.confidence_level}% sáv: {formatPrice(interval.lower_price)} - {formatPrice(interval.upper_price)}
            </em>
          )}
        </span>
      </div>

      <div className={`confidence-block probability-block ${probability?.decision?.key || ""}`}>
        <div>
          <small>{probabilityLabel}</small>
          <strong>{formatPercent(probabilityValue)}</strong>
        </div>
        <div
          className="confidence-track"
          role="progressbar"
          aria-label="Emelkedési esemény valószínűsége"
          aria-valuenow={probabilityValue}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span style={{ width: `${probabilityValue}%` }} />
        </div>
        <span className="probability-detail">{probabilityDetail}</span>
      </div>
    </section>
  );
}

export default ForecastSummary;

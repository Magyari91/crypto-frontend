import React from "react";
import { FiArrowDownRight, FiArrowUpRight, FiMinus, FiTarget } from "react-icons/fi";
import { formatPercent, formatPrice, formatUpdatedAt } from "../../utils/formatters";
import { useLanguage } from "../../i18n/LanguageContext";
import { translateApiText } from "../../i18n/apiText";

function ForecastSummary({ selected, generatedAt }) {
  const { copy, language } = useLanguage();
  const directions = {
    bullish: { label: copy.forecast.bullish, icon: FiArrowUpRight },
    bearish: { label: copy.forecast.bearish, icon: FiArrowDownRight },
    neutral: { label: copy.forecast.neutral, icon: FiMinus },
  };
  const forecast = selected.forecast;
  const direction = directions[forecast.direction_key] || directions.neutral;
  const DirectionIcon = direction.icon;
  const changeAvailable =
    selected.change_24h != null && Number.isFinite(Number(selected.change_24h));
  const changeClass = changeAvailable
    ? Number(selected.change_24h) >= 0
      ? "positive"
      : "negative"
    : "";
  const interval = forecast.prediction_interval;
  const probability = forecast.probability_forecast;
  const probabilityValue = probability?.probability_pct ?? forecast.confidence;
  const probabilityLabel = translateApiText(
    probability?.event?.formula || forecast.confidence_label,
    language
  );
  const probabilityDetail = probability
    ? probability.active
      ? `${translateApiText(probability.decision.label, language)} · ${copy.forecast.calibratedModel}`
      : probability.candidate_probability_pct == null
        ? copy.forecast.historicalBaselineCollecting
        : `${copy.forecast.historicalBaselineCollecting.split(" · ")[0]} · ${copy.forecast.candidate}: ${formatPercent(probability.candidate_probability_pct)}`
    : translateApiText(forecast.confidence_label, language);

  return (
    <section className={`forecast-summary ${forecast.direction_key}`} id="forecast">
      <div className="asset-identity">
        {selected.image ? (
          <img src={selected.image} alt="" />
        ) : (
          <span className="asset-symbol-avatar" aria-hidden="true">
            {selected.symbol.slice(0, 1)}
          </span>
        )}
        <div>
          <span>{selected.symbol}</span>
          <h2>{selected.name}</h2>
          <p className={changeClass}>
            {formatPercent(selected.change_24h, true)} {copy.forecast.last24h}
          </p>
        </div>
      </div>

      <div className="current-price">
        <small>{copy.forecast.currentPrice}</small>
        <strong>{formatPrice(selected.current_price)}</strong>
        <span>{copy.forecast.updated}: {formatUpdatedAt(generatedAt)}</span>
      </div>

      <div className="forecast-direction">
        <div className="direction-heading">
          <DirectionIcon aria-hidden="true" />
          <span>{direction.label}</span>
        </div>
        <strong>{formatPercent(forecast.expected_change_pct, true)}</strong>
        <small>
          {copy.forecast.horizonSignal(
            forecast.horizon_days,
            forecast.specialist?.active ? copy.forecast.hybrid : copy.forecast.guarded
          )}
        </small>
      </div>

      <div className="forecast-target">
        <FiTarget aria-hidden="true" />
        <span>
          <small>{copy.forecast.calibratedTarget}</small>
          <strong>{formatPrice(forecast.target_price)}</strong>
          {interval && (
            <em>
              {interval.confidence_level}% {copy.forecast.band}: {formatPrice(interval.lower_price)} - {formatPrice(interval.upper_price)}
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
          aria-label={copy.forecast.probability}
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

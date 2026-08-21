import React from "react";
import { FiActivity, FiCheckCircle, FiCpu, FiPauseCircle, FiShield, FiTarget } from "react-icons/fi";
import { formatPercent, formatPrice } from "../../utils/formatters";
import { useLanguage } from "../../i18n/LanguageContext";
import { translateApiText, translateFeatureLabel } from "../../i18n/apiText";

function profileLabel(risk, copy) {
  if (risk <= 3) return copy.risk.cautious;
  if (risk <= 7) return copy.risk.balanced;
  return copy.risk.high;
}

function RiskSignals({ forecast, risk }) {
  const { copy, language } = useLanguage();
  const indicators = forecast.indicators || {};
  const specialist = forecast.specialist;
  const specialistFeatures = specialist?.top_features || [];
  const SpecialistIcon = specialist?.active ? FiCpu : FiPauseCircle;
  const probability = forecast.probability_forecast;
  const probabilityFeatures = probability?.top_features || [];
  const distributionShift = probability?.distribution_shift;
  const shiftLabels = copy.risk.shifts;
  const directionLabel = copy.forecast[forecast.direction_key] || copy.forecast.neutral;
  const decisionKey = probability?.decision?.key || forecast.direction_key || "neutral";
  const decisionLabel = probability?.decision?.label
    ? translateApiText(probability.decision.label, language)
    : directionLabel;
  const expectedMove = Number(forecast.expected_change_pct);
  const expectedMoveTone = Number.isFinite(expectedMove)
    ? expectedMove > 0
      ? "positive"
      : expectedMove < 0
        ? "negative"
        : "neutral"
    : "neutral";

  return (
    <section className="surface risk-panel" id="risk" aria-labelledby="risk-title">
      <header className="panel-heading">
        <div>
          <span>{copy.risk.eyebrow}</span>
          <h2 id="risk-title">{copy.risk.title}</h2>
        </div>
        <FiShield aria-hidden="true" />
      </header>

      <div className="risk-profile">
        <small>{copy.risk.custom}</small>
        <strong>{profileLabel(risk, copy)}</strong>
      </div>

      <dl className="risk-levels">
        <div>
          <dt>{copy.risk.support}</dt>
          <dd>{formatPrice(forecast.support)}</dd>
        </div>
        <div>
          <dt>{copy.risk.resistance}</dt>
          <dd>{formatPrice(forecast.resistance)}</dd>
        </div>
        <div>
          <dt>{copy.risk.volatility}</dt>
          <dd>{translateApiText(forecast.volatility_label, language)} · {formatPercent(forecast.volatility)}</dd>
        </div>
        <div>
          <dt>RSI (14)</dt>
          <dd>{indicators.rsi ?? "-"}</dd>
        </div>
        <div>
          <dt>{copy.risk.regime}</dt>
          <dd>{translateApiText(forecast.regime?.label, language) || "-"}</dd>
        </div>
        <div>
          <dt>{copy.risk.technicalHoldout}</dt>
          <dd>
            {forecast.ensemble?.validation_skill_pct > 0
              ? formatPercent(forecast.ensemble.validation_skill_pct, true)
              : copy.risk.noVerifiedEdge}
          </dd>
        </div>
      </dl>

      {probability && (
        <div className={`specialist-status probability-status ${probability.active ? "active" : "standby"}`}>
          <div className="specialist-heading">
            <span>
              <FiTarget aria-hidden="true" />
              {probability.active ? copy.risk.activeProbability : copy.risk.probabilityGate}
            </span>
            <strong>{translateApiText(probability.model.family, language)}</strong>
          </div>
          <p>{translateApiText(probability.reason, language)}</p>
          <dl className="specialist-metrics">
            <div>
              <dt>{copy.risk.brierEdge}</dt>
              <dd>{formatPercent(probability.calibration.holdout_brier_skill_pct, true)}</dd>
            </div>
            <div>
              <dt>ROC AUC</dt>
              <dd>{probability.calibration.roc_auc?.toFixed(3) || "-"}</dd>
            </div>
            <div>
              <dt>{probability.stability.historical_total_checks ? copy.risk.previousGates : copy.risk.stableBlocks}</dt>
              <dd>
                {probability.stability.historical_total_checks
                  ? `${probability.stability.historical_positive_checks}/${probability.stability.historical_total_checks}`
                  : `${probability.stability.positive_blocks}/${probability.stability.total_blocks || 0}`}
              </dd>
            </div>
            <div>
              <dt>{copy.risk.distribution}</dt>
              <dd>
                {shiftLabels[distributionShift?.status] || "-"}
                {distributionShift?.score != null ? ` · ${distributionShift.score.toFixed(2)}` : ""}
              </dd>
            </div>
          </dl>
          {probabilityFeatures.length > 0 && (
            <div className="specialist-features">
              <small>{copy.risk.topProbabilityFeatures}</small>
              <ul>
                {probabilityFeatures.slice(0, 3).map((feature) => (
                  <li key={feature.key}>
                    <span>{translateFeatureLabel(feature, language)}</span>
                    <strong>{formatPercent(feature.importance_pct)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {specialist && (
        <div className={`specialist-status ${specialist.active ? "active" : "standby"}`}>
          <div className="specialist-heading">
            <span>
              <SpecialistIcon aria-hidden="true" />
              {specialist.active ? copy.risk.activeSpecialist : copy.risk.guardActive}
            </span>
            <strong>{translateApiText(specialist.family, language)}</strong>
          </div>
          <p>{translateApiText(specialist.reason, language)}</p>
          <dl className="specialist-metrics">
            <div>
              <dt>{copy.risk.trainingSamples}</dt>
              <dd>{specialist.training_samples}</dd>
            </div>
            <div>
              <dt>Holdout</dt>
              <dd>{specialist.holdout_samples || "-"}</dd>
            </div>
            <div>
              <dt>{copy.risk.measuredEdge}</dt>
              <dd>{formatPercent(specialist.validation_skill_pct, true)}</dd>
            </div>
          </dl>
          {specialistFeatures.length > 0 && (
            <div className="specialist-features">
              <small>{copy.risk.topFeatures}</small>
              <ul>
                {specialistFeatures.slice(0, 3).map((feature) => (
                  <li key={feature.key}>
                    <span>{translateFeatureLabel(feature, language)}</span>
                    <strong>{formatPercent(feature.importance_pct)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="signal-list" id="signals">
        <div className={`signal-forecast ${decisionKey}`} aria-labelledby="current-signal-title">
          <div className="signal-forecast-heading">
            <span>
              <FiActivity aria-hidden="true" />
              {copy.risk.currentForecast}
            </span>
            <h3 id="current-signal-title">{decisionLabel}</h3>
            <small>{copy.risk.horizonForecast(forecast.horizon_days, directionLabel)}</small>
          </div>
          <dl className="signal-forecast-metrics">
            <div>
              <dt>{copy.risk.targetPrice}</dt>
              <dd>{formatPrice(forecast.target_price)}</dd>
            </div>
            <div>
              <dt>{copy.risk.expectedMove}</dt>
              <dd className={expectedMoveTone}>
                {formatPercent(forecast.expected_change_pct, true)}
              </dd>
            </div>
            <div className="signal-probability">
              <dt>
                {translateApiText(
                  probability?.event?.formula || copy.risk.eventProbability,
                  language
                )}
              </dt>
              <dd>{formatPercent(probability?.probability_pct ?? forecast.confidence)}</dd>
            </div>
          </dl>
        </div>

        <div className="signal-list-title" id="model-signals-title">
          <FiActivity aria-hidden="true" />
          <strong>{copy.risk.modelSignals}</strong>
        </div>
        <ul aria-labelledby="model-signals-title">
          {(forecast.signals || []).map((signal) => (
            <li key={signal}>
              <FiCheckCircle aria-hidden="true" />
              <span>{translateApiText(signal, language)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default RiskSignals;

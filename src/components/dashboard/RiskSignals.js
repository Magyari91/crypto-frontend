import React from "react";
import { FiActivity, FiCheckCircle, FiCpu, FiPauseCircle, FiShield, FiTarget } from "react-icons/fi";
import { formatPercent, formatPrice } from "../../utils/formatters";

function profileLabel(risk) {
  if (risk <= 3) return "Óvatos profil";
  if (risk <= 7) return "Kiegyensúlyozott profil";
  return "Magas kockázattűrés";
}

function RiskSignals({ forecast, risk }) {
  const indicators = forecast.indicators || {};
  const specialist = forecast.specialist;
  const specialistFeatures = specialist?.top_features || [];
  const SpecialistIcon = specialist?.active ? FiCpu : FiPauseCircle;
  const probability = forecast.probability_forecast;
  const probabilityFeatures = probability?.top_features || [];
  const distributionShift = probability?.distribution_shift;
  const shiftLabels = {
    stable: "Stabil",
    watch: "Figyelendő",
    elevated: "Emelkedett",
    insufficient: "Nincs elég adat",
  };

  return (
    <section className="surface risk-panel" id="risk" aria-labelledby="risk-title">
      <header className="panel-heading">
        <div>
          <span>Kockázati kép</span>
          <h2 id="risk-title">Szintek és jelzések</h2>
        </div>
        <FiShield aria-hidden="true" />
      </header>

      <div className="risk-profile">
        <small>Saját beállítás</small>
        <strong>{profileLabel(risk)}</strong>
      </div>

      <dl className="risk-levels">
        <div>
          <dt>Támasz</dt>
          <dd>{formatPrice(forecast.support)}</dd>
        </div>
        <div>
          <dt>Ellenállás</dt>
          <dd>{formatPrice(forecast.resistance)}</dd>
        </div>
        <div>
          <dt>Volatilitás</dt>
          <dd>{forecast.volatility_label} · {formatPercent(forecast.volatility)}</dd>
        </div>
        <div>
          <dt>RSI (14)</dt>
          <dd>{indicators.rsi ?? "-"}</dd>
        </div>
        <div>
          <dt>Piaci rezsim</dt>
          <dd>{forecast.regime?.label || "-"}</dd>
        </div>
        <div>
          <dt>Technikai holdout</dt>
          <dd>
            {forecast.ensemble?.validation_skill_pct > 0
              ? formatPercent(forecast.ensemble.validation_skill_pct, true)
              : "Nincs igazolt előny"}
          </dd>
        </div>
      </dl>

      {probability && (
        <div className={`specialist-status probability-status ${probability.active ? "active" : "standby"}`}>
          <div className="specialist-heading">
            <span>
              <FiTarget aria-hidden="true" />
              {probability.active ? "Aktív valószínűségi modell" : "Valószínűségi védelmi kapu"}
            </span>
            <strong>{probability.model.family}</strong>
          </div>
          <p>{probability.reason}</p>
          <dl className="specialist-metrics">
            <div>
              <dt>Brier-előny</dt>
              <dd>{formatPercent(probability.calibration.holdout_brier_skill_pct, true)}</dd>
            </div>
            <div>
              <dt>ROC AUC</dt>
              <dd>{probability.calibration.roc_auc?.toFixed(3) || "-"}</dd>
            </div>
            <div>
              <dt>{probability.stability.historical_total_checks ? "Korábbi kapuk" : "Stabil blokkok"}</dt>
              <dd>
                {probability.stability.historical_total_checks
                  ? `${probability.stability.historical_positive_checks}/${probability.stability.historical_total_checks}`
                  : `${probability.stability.positive_blocks}/${probability.stability.total_blocks || 0}`}
              </dd>
            </div>
            <div>
              <dt>Adateloszlás</dt>
              <dd>
                {shiftLabels[distributionShift?.status] || "-"}
                {distributionShift?.score != null ? ` · ${distributionShift.score.toFixed(2)}` : ""}
              </dd>
            </div>
          </dl>
          {probabilityFeatures.length > 0 && (
            <div className="specialist-features">
              <small>Legfontosabb valószínűségi jellemzők</small>
              <ul>
                {probabilityFeatures.slice(0, 3).map((feature) => (
                  <li key={feature.key}>
                    <span>{feature.label}</span>
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
              {specialist.active ? "Aktív specialista" : "Védelmi kapu aktív"}
            </span>
            <strong>{specialist.family}</strong>
          </div>
          <p>{specialist.reason}</p>
          <dl className="specialist-metrics">
            <div>
              <dt>Tanítóminta</dt>
              <dd>{specialist.training_samples}</dd>
            </div>
            <div>
              <dt>Holdout</dt>
              <dd>{specialist.holdout_samples || "-"}</dd>
            </div>
            <div>
              <dt>Mért előny</dt>
              <dd>{formatPercent(specialist.validation_skill_pct, true)}</dd>
            </div>
          </dl>
          {specialistFeatures.length > 0 && (
            <div className="specialist-features">
              <small>Legnagyobb súlyú jellemzők</small>
              <ul>
                {specialistFeatures.slice(0, 3).map((feature) => (
                  <li key={feature.key}>
                    <span>{feature.label}</span>
                    <strong>{formatPercent(feature.importance_pct)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="signal-list" id="signals">
        <div className="signal-list-title">
          <FiActivity aria-hidden="true" />
          <strong>Modelljelzések</strong>
        </div>
        <ul>
          {forecast.signals.map((signal) => (
            <li key={signal}>
              <FiCheckCircle aria-hidden="true" />
              <span>{signal}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default RiskSignals;

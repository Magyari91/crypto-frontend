import React from "react";
import {
  FiActivity,
  FiAlertTriangle,
  FiArrowDownRight,
  FiArrowUpRight,
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiDatabase,
  FiMinus,
  FiRefreshCw,
  FiXCircle,
} from "react-icons/fi";
import { formatPercent, formatPrice } from "../../utils/formatters";
import ModelLab from "./ModelLab";

const directions = {
  bullish: { label: "Emelkedő", icon: FiArrowUpRight },
  bearish: { label: "Csökkenő", icon: FiArrowDownRight },
  neutral: { label: "Semleges", icon: FiMinus },
};

const readinessStates = {
  storage_required: {
    label: "Tartós tárhely szükséges",
    icon: FiAlertTriangle,
    tone: "warning",
  },
  collecting: { label: "Mintagyűjtés", icon: FiActivity, tone: "pending" },
  maturing: { label: "Címkék érlelődnek", icon: FiClock, tone: "pending" },
  labeling_delayed: {
    label: "Címkézésre vár",
    icon: FiAlertTriangle,
    tone: "warning",
  },
  collecting_labels: {
    label: "Tanítóminta épül",
    icon: FiActivity,
    tone: "pending",
  },
  ready: { label: "Tanítható adatkészlet", icon: FiCheckCircle, tone: "ready" },
};

function formatDate(value, includeTime = false) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(new Date(value));
}

function formatScore(value, digits = 4) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return number.toFixed(digits).replace(".", ",");
}

function Direction({ value }) {
  const direction = directions[value] || directions.neutral;
  const Icon = direction.icon;
  return (
    <span className={`audit-direction ${value || "neutral"}`}>
      <Icon aria-hidden="true" />
      {direction.label}
    </span>
  );
}

function Metric({ label, value, detail, tone = "" }) {
  return (
    <div className={`audit-metric ${tone}`}>
      <small>{label}</small>
      <strong>{value}</strong>
      <span>{detail}</span>
    </div>
  );
}

function ReadinessMetric({ label, value, detail }) {
  return (
    <div className="readiness-metric">
      <small>{label}</small>
      <strong>{value}</strong>
      <span>{detail}</span>
    </div>
  );
}

function TrainingReadiness({ readiness }) {
  if (!readiness) return null;

  const state = readinessStates[readiness.status] || readinessStates.collecting;
  const StateIcon = state.icon;
  const persistent = Boolean(readiness.storage?.persistent);
  const remaining = Number(readiness.remaining_independent_labels) || 0;
  const overdue = Number(readiness.overdue_sample_count) || 0;
  const labelDetail = overdue
    ? `${overdue} lejárt minta vár címkére`
    : readiness.next_due_at
      ? `következő lejárat: ${formatDate(readiness.next_due_at, true)}`
      : "nincs esedékes címke";

  return (
    <section
      className="surface training-readiness-panel"
      aria-labelledby="training-readiness-title"
    >
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Pont-időben gyűjtött adatok</span>
          <h2 id="training-readiness-title">Tanítási készültség</h2>
        </div>
        <span className={`readiness-state ${state.tone}`}>
          <StateIcon aria-hidden="true" />
          {state.label}
        </span>
      </div>

      <div className="readiness-metrics">
        <ReadinessMetric
          label="Tárolás"
          value={persistent ? "PostgreSQL" : "Ideiglenes SQLite"}
          detail={persistent ? "újraindításálló" : "újraindításkor törlődhet"}
        />
        <ReadinessMetric
          label="Összes snapshot"
          value={readiness.sample_count}
          detail="pont-időbeli feature minta"
        />
        <ReadinessMetric
          label="Lezárt kimenet"
          value={readiness.labeled_sample_count}
          detail={`${formatPercent(readiness.label_coverage_pct)} lefedettség · ${labelDetail}`}
        />
        <ReadinessMetric
          label="Független lezárt nap"
          value={`${readiness.independent_labeled_days}/${readiness.minimum_independent_labels}`}
          detail={remaining ? `${remaining} hiányzik a tanítási kapuhoz` : "a minimum teljesült"}
        />
      </div>

      <div className="readiness-progress">
        <div>
          <span>Adatkészlet előrehaladása</span>
          <strong>{formatPercent(readiness.progress_pct)}</strong>
        </div>
        <div className="readiness-track" aria-hidden="true">
          <span style={{ width: `${Math.min(100, readiness.progress_pct || 0)}%` }} />
        </div>
        <p>{readiness.reason}</p>
      </div>
    </section>
  );
}

function LoadingAnalytics() {
  return (
    <div className="analytics-loading" role="status">
      <FiRefreshCw className="spin" aria-hidden="true" />
      <span>A lezárt előrejelzések kiértékelése...</span>
    </div>
  );
}

function AnalyticsError({ message, onRetry }) {
  return (
    <div className="analytics-error" role="alert">
      <FiXCircle aria-hidden="true" />
      <span>{message}</span>
      <button type="button" onClick={onRetry}>
        <FiRefreshCw aria-hidden="true" />
        Újrapróbálás
      </button>
    </div>
  );
}

function BacktestContent({ backtest }) {
  const { summary, recent_results: recentResults, agreement_bands: agreementBands } = backtest;
  const probability = summary.probability;
  const probabilityAudit = probability?.challenger || probability;
  const calibrationBins = probability?.reliability_bins || [];
  const technicalSkill = summary.skill_vs_technical_pct ?? summary.skill_vs_baseline_pct;
  const technicalMae = summary.technical_mae_pct ?? summary.baseline_mae_pct;
  const skillTone =
    technicalSkill > 0.25
      ? "positive"
      : technicalSkill < -0.25
        ? "negative"
        : "";
  const skillDetail =
    technicalSkill > 0.25
      ? "Jobb a korábbi modellnél"
      : technicalSkill < -0.25
        ? "Fejlesztést igényel"
        : "A korábbi modell szintje";
  const activeAccuracy = summary.active_directional_accuracy;
  const probabilitySkill = probabilityAudit?.brier_skill_pct;
  const probabilityTone =
    probabilitySkill > 0.25 ? "positive" : probabilitySkill < -0.25 ? "negative" : "";

  return (
    <>
      <div className="audit-metrics">
        <Metric
          label={probability ? probability.challenger ? "Challenger Brier score" : "Brier score" : "Aktív jel találati aránya"}
          value={probability ? formatScore(probabilityAudit.brier_score) : activeAccuracy == null ? "Nincs aktív jel" : formatPercent(activeAccuracy)}
          detail={probability
            ? `alapesély: ${formatScore(probabilityAudit.baseline_brier_score)}`
            : `${formatPercent(summary.signal_coverage_pct)} lefedettség · ${formatPercent(summary.specialist_usage_pct || 0)} specialista`}
        />
        <Metric
          label={probability ? probability.challenger ? "Challenger Brier-előny" : "Brier-előny" : "Átlagos modellhiba"}
          value={probability ? formatPercent(probabilityAudit.brier_skill_pct, true) : formatPercent(summary.mae_pct)}
          detail={probability ? `${probabilityAudit.samples || summary.samples} walk-forward minta` : "MAE, százalékpont"}
          tone={probability ? probabilityTone : ""}
        />
        <Metric
          label={probability ? "ROC AUC" : "Korábbi modell hibája"}
          value={probability ? formatScore(probabilityAudit.roc_auc, 3) : formatPercent(technicalMae)}
          detail={probability
            ? `${formatPercent(probabilityAudit.calibration_error_pct)} kalibrációs hiba`
            : `v2 technikai modell · ${summary.samples} minta`}
        />
        <Metric
          label={probability ? "BUY-jelölt pontosság" : "Előny a v2-höz képest"}
          value={probability
            ? probability.buy_precision_pct == null
              ? "Nincs aktív jel"
              : formatPercent(probability.buy_precision_pct)
            : formatPercent(technicalSkill, true)}
          detail={probability
            ? `${formatPercent(probability.buy_signal_coverage_pct)} lefedettség · ${formatPercent(probability.active_model_usage_pct)} aktív modell`
            : skillDetail}
          tone={probability ? "" : skillTone}
        />
      </div>

      <div className="audit-detail-grid">
        <div className="audit-results">
          <div className="subsection-heading">
            <h3>Legutóbbi teszteredmények</h3>
            <span>{formatDate(backtest.period.from)} - {formatDate(backtest.period.to)}</span>
          </div>
          <div className="audit-table-scroll">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Dátum</th>
                  <th>Jelzés</th>
                  <th>Becslés</th>
                  <th>Tény</th>
                  <th>Eredmény</th>
                </tr>
              </thead>
              <tbody>
                {recentResults.map((result) => (
                  <tr key={result.forecast_at}>
                    <td>{formatDate(result.forecast_at)}</td>
                    <td><Direction value={result.predicted_direction} /></td>
                    <td>{formatPercent(result.predicted_change_pct, true)}</td>
                    <td className={result.actual_change_pct >= 0 ? "positive" : "negative"}>
                      {formatPercent(result.actual_change_pct, true)}
                    </td>
                    <td>
                      <span
                        className={`audit-result ${
                          result.predicted_direction === "neutral"
                            ? "abstain"
                            : result.hit
                              ? "hit"
                              : "miss"
                        }`}
                      >
                        {result.predicted_direction === "neutral" ? (
                          <FiMinus aria-hidden="true" />
                        ) : result.hit ? (
                          <FiCheckCircle aria-hidden="true" />
                        ) : (
                          <FiXCircle aria-hidden="true" />
                        )}
                        {result.predicted_direction === "neutral"
                          ? "Tartózkodott"
                          : result.hit
                            ? "Talált"
                            : "Eltért"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="agreement-breakdown">
          <div className="subsection-heading">
            <h3>{calibrationBins.length ? "Kalibrációs sávok" : "Aktív jelek minőség szerint"}</h3>
          </div>
          <ul>
            {(calibrationBins.length ? calibrationBins : agreementBands).map((band) => (
              <li key={band.label || `${band.from_pct}-${band.to_pct}`}>
                <div>
                  <span>{band.label || `${band.from_pct}-${band.to_pct}% becslés`}</span>
                  <strong>
                    {(band.observed_frequency_pct ?? band.directional_accuracy) == null
                      ? "Nincs minta"
                      : formatPercent(band.observed_frequency_pct ?? band.directional_accuracy)}
                  </strong>
                </div>
                <div className="agreement-track" aria-hidden="true">
                  <span style={{ width: `${band.observed_frequency_pct ?? band.directional_accuracy ?? 0}%` }} />
                </div>
                <small>
                  {calibrationBins.length
                    ? `átlagos becslés: ${formatPercent(band.mean_probability_pct)} · ${band.samples} minta`
                    : `${band.samples} aktív jel · ${band.total_samples} minta`}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="methodology-note">{backtest.methodology}</p>
    </>
  );
}

function ForecastHistory({ history }) {
  if (!history.length) {
    return <p className="empty-copy">Az első élő előrejelzés naplózása folyamatban van.</p>;
  }

  return (
    <ol className="forecast-history-list">
      {history.slice(0, 8).map((record) => (
        <li key={record.id}>
          <div className="history-main">
            <span>{formatDate(record.generated_at, true)} · v{record.model_version}</span>
            <Direction value={record.direction_key} />
          </div>
          <div className={`history-values ${record.event_probability_pct != null ? "with-probability" : ""}`}>
            <span>
              <small>Kiinduló ár</small>
              <strong>{formatPrice(record.base_price)}</strong>
            </span>
            <span>
              <small>Modell cél</small>
              <strong>{formatPrice(record.target_price)}</strong>
            </span>
            {record.event_probability_pct != null && (
              <span>
                <small>Esemény esélye</small>
                <strong>{formatPercent(record.event_probability_pct)}</strong>
              </span>
            )}
          </div>
          <div className={`history-status ${record.status}`}>
            {record.status === "evaluated" ? (
              record.hit ? <FiCheckCircle aria-hidden="true" /> : <FiXCircle aria-hidden="true" />
            ) : (
              <FiClock aria-hidden="true" />
            )}
            <span>
              {record.status === "evaluated"
                ? `Tény: ${formatPercent(record.actual_change_pct, true)}`
                : `Kiértékelés: ${formatDate(record.due_at)}`}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ForecastAnalytics({ data, loading, error, onRetry }) {
  return (
    <div className="forecast-audit-grid" id="performance">
      <section className="surface backtest-panel" aria-labelledby="backtest-title">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Walk-forward visszamérés</span>
            <h2 id="backtest-title">Modell teljesítménye</h2>
          </div>
          <FiBarChart2 aria-hidden="true" />
        </div>
        {!data && loading && <LoadingAnalytics />}
        {!data && error && <AnalyticsError message={error} onRetry={onRetry} />}
        {data && <BacktestContent backtest={data.backtest} />}
      </section>

      <section className="surface journal-panel" aria-labelledby="journal-title">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Élő napló</span>
            <h2 id="journal-title">Előrejelzési előzmények</h2>
          </div>
          <FiDatabase aria-hidden="true" />
        </div>
        {!data && loading && <LoadingAnalytics />}
        {!data && error && <AnalyticsError message={error} onRetry={onRetry} />}
        {data && <ForecastHistory history={data.history || []} />}
      </section>

      {data && <TrainingReadiness readiness={data.training_readiness} />}

      {data && [1, 7].includes(data.horizon_days) && (
        <ModelLab coin={data.asset.id} horizon={data.horizon_days} />
      )}
    </div>
  );
}

export default ForecastAnalytics;

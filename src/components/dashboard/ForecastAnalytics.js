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
  FiTrendingUp,
  FiXCircle,
} from "react-icons/fi";
import { formatPercent, formatPrice } from "../../utils/formatters";
import { useLanguage } from "../../i18n/LanguageContext";
import { translateApiText } from "../../i18n/apiText";
import ModelLab from "./ModelLab";

const readinessStates = {
  storage_required: {
    labelKey: "storageRequired",
    icon: FiAlertTriangle,
    tone: "warning",
  },
  collecting: { labelKey: "collecting", icon: FiActivity, tone: "pending" },
  maturing: { labelKey: "maturing", icon: FiClock, tone: "pending" },
  labeling_delayed: {
    labelKey: "labelingDelayed",
    icon: FiAlertTriangle,
    tone: "warning",
  },
  collecting_labels: {
    labelKey: "collectingLabels",
    icon: FiActivity,
    tone: "pending",
  },
  ready: { labelKey: "ready", icon: FiCheckCircle, tone: "ready" },
};

function formatDate(value, locale, includeTime = false) {
  if (!value) return "-";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(new Date(value));
}

function formatScore(value, locale, digits = 4) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(number);
}

function Direction({ value }) {
  const { copy } = useLanguage();
  const directions = {
    bullish: { label: copy.analytics.bullish, icon: FiArrowUpRight },
    bearish: { label: copy.analytics.bearish, icon: FiArrowDownRight },
    neutral: { label: copy.analytics.neutral, icon: FiMinus },
  };
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
  const { copy, locale, language } = useLanguage();
  if (!readiness) return null;

  const state = readinessStates[readiness.status] || readinessStates.collecting;
  const StateIcon = state.icon;
  const persistent = Boolean(readiness.storage?.persistent);
  const remaining = Number(readiness.remaining_independent_labels) || 0;
  const overdue = Number(readiness.overdue_sample_count) || 0;
  const labelDetail = overdue
    ? copy.analytics.overdueSamples(overdue)
    : readiness.next_due_at
      ? copy.analytics.nextDue(formatDate(readiness.next_due_at, locale, true))
      : copy.analytics.noDue;

  return (
    <section
      className="surface training-readiness-panel"
      aria-labelledby="training-readiness-title"
    >
      <div className="panel-heading">
        <div>
          <span className="eyebrow">{copy.analytics.readinessEyebrow}</span>
          <h2 id="training-readiness-title">{copy.analytics.readinessTitle}</h2>
        </div>
        <span className={`readiness-state ${state.tone}`}>
          <StateIcon aria-hidden="true" />
          {copy.analytics[state.labelKey]}
        </span>
      </div>

      <div className="readiness-metrics">
        <ReadinessMetric
          label={copy.analytics.storage}
          value={persistent ? "PostgreSQL" : copy.analytics.temporarySqlite}
          detail={persistent ? copy.analytics.persistent : copy.analytics.temporary}
        />
        <ReadinessMetric
          label={copy.analytics.totalSnapshots}
          value={readiness.sample_count}
          detail={copy.analytics.pointInTimeSample}
        />
        <ReadinessMetric
          label={copy.analytics.closedOutcome}
          value={readiness.labeled_sample_count}
          detail={`${formatPercent(readiness.label_coverage_pct)} ${copy.analytics.coverage} · ${labelDetail}`}
        />
        <ReadinessMetric
          label={copy.analytics.independentDays}
          value={`${readiness.independent_labeled_days}/${readiness.minimum_independent_labels}`}
          detail={remaining ? copy.analytics.missingForGate(remaining) : copy.analytics.minimumMet}
        />
      </div>

      <div className="readiness-progress">
        <div>
          <span>{copy.analytics.datasetProgress}</span>
          <strong>{formatPercent(readiness.progress_pct)}</strong>
        </div>
        <div className="readiness-track" aria-hidden="true">
          <span style={{ width: `${Math.min(100, readiness.progress_pct || 0)}%` }} />
        </div>
        <p>{translateApiText(readiness.reason, language)}</p>
      </div>
    </section>
  );
}

function LivePerformance({ performance }) {
  const { copy, language } = useLanguage();
  if (!performance) return null;

  const allTime = performance.all_time || {};
  const rows = [
    ...(performance.windows || []).map((window) => ({
      ...window,
      label: copy.analytics.days(window.days),
    })),
    { ...allTime, label: copy.analytics.allTime },
  ];

  return (
    <section
      className="surface live-performance-panel"
      aria-labelledby="live-performance-title"
    >
      <div className="panel-heading">
        <div>
          <span className="eyebrow">{copy.analytics.liveEyebrow}</span>
          <h2 id="live-performance-title">{copy.analytics.liveTitle}</h2>
        </div>
        <FiTrendingUp aria-hidden="true" />
      </div>

      {!allTime.samples ? (
        <p className="empty-copy live-performance-empty">
          {copy.analytics.liveEmpty}
        </p>
      ) : (
        <div className="live-performance-scroll">
          <table className="live-performance-table">
            <thead>
              <tr>
                <th>{copy.analytics.timeWindow}</th>
                <th>{copy.analytics.samples}</th>
                <th>MAE</th>
                <th>{copy.analytics.baselineMae}</th>
                <th>{copy.analytics.skill}</th>
                <th>{copy.analytics.activeHit}</th>
                <th>{copy.analytics.interval80}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const skill = Number(row.skill_vs_baseline_pct);
                const tone = Number.isFinite(skill)
                  ? skill > 0
                    ? "positive"
                    : skill < 0
                      ? "negative"
                      : ""
                  : "";
                return (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.samples || 0}</td>
                    <td>{formatPercent(row.mae_pct)}</td>
                    <td>{formatPercent(row.baseline_mae_pct)}</td>
                    <td className={tone}>{formatPercent(row.skill_vs_baseline_pct, true)}</td>
                    <td>{formatPercent(row.active_directional_accuracy_pct)}</td>
                    <td>{formatPercent(row.interval_coverage_pct)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="methodology-note">{translateApiText(performance.methodology, language)}</p>
    </section>
  );
}

function LoadingAnalytics() {
  const { copy } = useLanguage();
  return (
    <div className="analytics-loading" role="status">
      <FiRefreshCw className="spin" aria-hidden="true" />
      <span>{copy.analytics.evaluating}</span>
    </div>
  );
}

function AnalyticsError({ message, onRetry }) {
  const { copy } = useLanguage();
  return (
    <div className="analytics-error" role="alert">
      <FiXCircle aria-hidden="true" />
      <span>{message}</span>
      <button type="button" onClick={onRetry}>
        <FiRefreshCw aria-hidden="true" />
        {copy.states.retry}
      </button>
    </div>
  );
}

function BacktestContent({ backtest }) {
  const { copy, locale, language } = useLanguage();
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
      ? copy.analytics.better
      : technicalSkill < -0.25
        ? copy.analytics.needsImprovement
        : copy.analytics.sameLevel;
  const activeAccuracy = summary.active_directional_accuracy;
  const probabilitySkill = probabilityAudit?.brier_skill_pct;
  const probabilityTone =
    probabilitySkill > 0.25 ? "positive" : probabilitySkill < -0.25 ? "negative" : "";

  return (
    <>
      <div className="audit-metrics">
        <Metric
          label={probability ? probability.challenger ? "Challenger Brier score" : "Brier score" : copy.analytics.activeAccuracy}
          value={probability ? formatScore(probabilityAudit.brier_score, locale) : activeAccuracy == null ? copy.analytics.noActiveSignal : formatPercent(activeAccuracy)}
          detail={probability
            ? `${copy.analytics.baseline}: ${formatScore(probabilityAudit.baseline_brier_score, locale)}`
            : `${formatPercent(summary.signal_coverage_pct)} ${copy.analytics.coverage} · ${formatPercent(summary.specialist_usage_pct || 0)} ${copy.analytics.specialist}`}
        />
        <Metric
          label={probability ? probability.challenger ? copy.analytics.challengerBrierSkill : copy.analytics.brierSkill : copy.analytics.averageError}
          value={probability ? formatPercent(probabilityAudit.brier_skill_pct, true) : formatPercent(summary.mae_pct)}
          detail={probability ? copy.analytics.walkForwardSamples(probabilityAudit.samples || summary.samples) : copy.analytics.maePoints}
          tone={probability ? probabilityTone : ""}
        />
        <Metric
          label={probability ? "ROC AUC" : copy.analytics.previousModelError}
          value={probability ? formatScore(probabilityAudit.roc_auc, locale, 3) : formatPercent(technicalMae)}
          detail={probability
            ? `${formatPercent(probabilityAudit.calibration_error_pct)} ${copy.analytics.calibrationError}`
            : copy.analytics.technicalModelSamples(summary.samples)}
        />
        <Metric
          label={probability ? copy.analytics.buyPrecision : copy.analytics.edgeVsV2}
          value={probability
            ? probability.buy_precision_pct == null
              ? copy.analytics.noActiveSignal
              : formatPercent(probability.buy_precision_pct)
            : formatPercent(technicalSkill, true)}
          detail={probability
            ? `${formatPercent(probability.buy_signal_coverage_pct)} ${copy.analytics.coverage} · ${formatPercent(probability.active_model_usage_pct)} ${copy.analytics.activeModel}`
            : skillDetail}
          tone={probability ? "" : skillTone}
        />
      </div>

      <div className="audit-detail-grid">
        <div className="audit-results">
          <div className="subsection-heading">
            <h3>{copy.analytics.latestResults}</h3>
            <span>{formatDate(backtest.period.from, locale)} - {formatDate(backtest.period.to, locale)}</span>
          </div>
          <div className="audit-table-scroll">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>{copy.analytics.date}</th>
                  <th>{copy.analytics.signal}</th>
                  <th>{copy.analytics.estimate}</th>
                  <th>{copy.analytics.actual}</th>
                  <th>{copy.analytics.result}</th>
                </tr>
              </thead>
              <tbody>
                {recentResults.map((result) => (
                  <tr key={result.forecast_at}>
                    <td>{formatDate(result.forecast_at, locale)}</td>
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
                          ? copy.analytics.abstained
                          : result.hit
                            ? copy.analytics.hit
                            : copy.analytics.missed}
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
            <h3>{calibrationBins.length ? copy.analytics.calibrationBands : copy.analytics.activeSignalQuality}</h3>
          </div>
          <ul>
            {(calibrationBins.length ? calibrationBins : agreementBands).map((band) => (
              <li key={band.label || `${band.from_pct}-${band.to_pct}`}>
                <div>
                  <span>{band.label || copy.analytics.estimateBand(band.from_pct, band.to_pct)}</span>
                  <strong>
                    {(band.observed_frequency_pct ?? band.directional_accuracy) == null
                      ? copy.analytics.noSample
                      : formatPercent(band.observed_frequency_pct ?? band.directional_accuracy)}
                  </strong>
                </div>
                <div className="agreement-track" aria-hidden="true">
                  <span style={{ width: `${band.observed_frequency_pct ?? band.directional_accuracy ?? 0}%` }} />
                </div>
                <small>
                  {calibrationBins.length
                    ? copy.analytics.meanEstimate(formatPercent(band.mean_probability_pct), band.samples)
                    : copy.analytics.activeSignals(band.samples, band.total_samples)}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="methodology-note">{translateApiText(backtest.methodology, language)}</p>
    </>
  );
}

function ForecastHistory({ history }) {
  const { copy, locale } = useLanguage();
  if (!history.length) {
    return <p className="empty-copy">{copy.analytics.historyEmpty}</p>;
  }

  return (
    <ol className="forecast-history-list">
      {history.slice(0, 8).map((record) => (
        <li key={record.id}>
          <div className="history-main">
            <span>{formatDate(record.generated_at, locale, true)} · v{record.model_version}</span>
            <Direction value={record.direction_key} />
          </div>
          <div className={`history-values ${record.event_probability_pct != null ? "with-probability" : ""}`}>
            <span>
              <small>{copy.analytics.basePrice}</small>
              <strong>{formatPrice(record.base_price)}</strong>
            </span>
            <span>
              <small>{copy.analytics.modelTarget}</small>
              <strong>{formatPrice(record.target_price)}</strong>
            </span>
            {record.event_probability_pct != null && (
              <span>
                <small>{copy.analytics.eventChance}</small>
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
                ? `${copy.analytics.actualPrefix}: ${formatPercent(record.actual_change_pct, true)}`
                : `${copy.analytics.evaluation}: ${formatDate(record.due_at, locale)}`}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ForecastAnalytics({ data, loading, error, onRetry }) {
  const { copy } = useLanguage();
  return (
    <div className="forecast-audit-grid" id="performance">
      <section className="surface backtest-panel" aria-labelledby="backtest-title">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">{copy.analytics.backtestEyebrow}</span>
            <h2 id="backtest-title">{copy.analytics.backtestTitle}</h2>
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
            <span className="eyebrow">{copy.analytics.journalEyebrow}</span>
            <h2 id="journal-title">{copy.analytics.journalTitle}</h2>
          </div>
          <FiDatabase aria-hidden="true" />
        </div>
        {!data && loading && <LoadingAnalytics />}
        {!data && error && <AnalyticsError message={error} onRetry={onRetry} />}
        {data && <ForecastHistory history={data.history || []} />}
      </section>

      {data && <TrainingReadiness readiness={data.training_readiness} />}

      {data && <LivePerformance performance={data.live_performance} />}

      {data && [1, 7].includes(data.horizon_days) && (
        <ModelLab coin={data.asset.id} horizon={data.horizon_days} />
      )}
    </div>
  );
}

export default ForecastAnalytics;

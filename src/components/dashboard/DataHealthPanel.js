import React from "react";
import {
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiDatabase,
  FiRefreshCw,
} from "react-icons/fi";
import { formatPercent } from "../../utils/formatters";
import { useLanguage } from "../../i18n/LanguageContext";

const healthStates = {
  healthy: { labelKey: "healthy", icon: FiCheckCircle, tone: "ready" },
  collecting: { labelKey: "collecting", icon: FiActivity, tone: "pending" },
  labeling_delayed: {
    labelKey: "labelingDelayed",
    icon: FiAlertTriangle,
    tone: "warning",
  },
  stale: { labelKey: "stale", icon: FiAlertTriangle, tone: "warning" },
  storage_warning: {
    labelKey: "storageWarning",
    icon: FiDatabase,
    tone: "warning",
  },
  storage_critical: {
    labelKey: "storageCritical",
    icon: FiAlertTriangle,
    tone: "warning",
  },
  storage_required: {
    labelKey: "storageRequired",
    icon: FiAlertTriangle,
    tone: "warning",
  },
};

function formatBytes(value, locale) {
  if (value == null) return "-";
  const bytes = Number(value);
  if (!Number.isFinite(bytes) || bytes < 0) return "-";
  const number = bytes < 1024 * 1024 ? bytes / 1024 : bytes / (1024 * 1024);
  const unit = bytes < 1024 * 1024 ? "KB" : "MB";
  const digits = unit === "KB" ? 1 : 2;
  return `${new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(number)} ${unit}`;
}

function formatAge(value, locale, copy) {
  const minutes = Number(value);
  if (!Number.isFinite(minutes)) return "-";
  if (minutes < 1) return copy.dataHealth.now;
  if (minutes < 60) return copy.dataHealth.minutesAgo(Math.round(minutes));
  return copy.dataHealth.hoursAgo(
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(minutes / 60)
  );
}

function formatDate(value, locale, copy) {
  if (!value) return copy.dataHealth.noSample;
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function HealthMetric({ label, value, detail }) {
  return (
    <div className="data-health-metric">
      <small>{label}</small>
      <strong>{value}</strong>
      <span>{detail}</span>
    </div>
  );
}

function DataHealthPanel({ data, loading, refreshing, error, onRetry }) {
  const { copy, locale } = useLanguage();
  const state = healthStates[data?.status] || healthStates.collecting;
  const StateIcon = state.icon;
  const totals = data?.totals || {};
  const storage = data?.storage || {};
  const collector = data?.collector || {};
  const storageDetail = storage.limit_bytes
    ? `${formatPercent(storage.utilization_pct)} ${copy.dataHealth.utilization}`
    : copy.dataHealth.noStorageLimit;

  return (
    <section className="surface data-health-panel" aria-labelledby="data-health-title">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">{copy.dataHealth.eyebrow}</span>
          <h2 id="data-health-title">{copy.dataHealth.title}</h2>
        </div>
        <div className="data-health-actions">
          {data && (
            <span className={`readiness-state ${state.tone}`}>
              <StateIcon aria-hidden="true" />
              {copy.dataHealth[state.labelKey]}
            </span>
          )}
          <button
            type="button"
            className="icon-button compact"
            onClick={onRetry}
            disabled={loading || refreshing}
            aria-label={copy.dataHealth.refresh}
            title={copy.dataHealth.refresh}
          >
            <FiRefreshCw aria-hidden="true" />
          </button>
        </div>
      </div>

      {error && !data ? (
        <div className="data-health-message error" role="alert">
          <FiAlertTriangle aria-hidden="true" />
          <span>{error}</span>
        </div>
      ) : loading && !data ? (
        <div className="data-health-message" role="status">
          <FiActivity aria-hidden="true" />
          <span>{copy.dataHealth.loading}</span>
        </div>
      ) : data ? (
        <>
          {error && <div className="data-health-inline-warning">{error}</div>}
          <div className="data-health-metrics">
            <HealthMetric
              label={copy.dataHealth.latestSnapshot}
              value={formatAge(collector.latest_snapshot_age_minutes, locale, copy)}
              detail={`${formatDate(collector.latest_snapshot_at, locale, copy)} · ${copy.dataHealth.interval(collector.interval_minutes)}`}
            />
            <HealthMetric
              label={copy.dataHealth.activeDataset}
              value={`${totals.active_dataset_count || 0}/${totals.expected_dataset_count || 30}`}
              detail={`${formatPercent(totals.dataset_coverage_pct)} ${copy.dataHealth.coverage}`}
            />
            <HealthMetric
              label={copy.dataHealth.snapshotLabel}
              value={`${totals.snapshot_count || 0} / ${totals.outcome_count || 0}`}
              detail={`${totals.pending_count || 0} ${copy.dataHealth.pending} · ${totals.overdue_count || 0} ${copy.dataHealth.overdue}`}
            />
            <HealthMetric
              label={copy.dataHealth.storage}
              value={`${formatBytes(storage.database_size_bytes, locale)} / ${formatBytes(storage.limit_bytes, locale)}`}
              detail={storageDetail}
            />
          </div>

          <div className="data-health-progress">
            <div>
              <span>{copy.dataHealth.datasetCoverage}</span>
              <strong>{formatPercent(totals.dataset_coverage_pct)}</strong>
            </div>
            <div className="readiness-track" aria-hidden="true">
              <span style={{ width: `${Math.min(100, totals.dataset_coverage_pct || 0)}%` }} />
            </div>
          </div>

          <div className="data-health-table-wrap">
            <table className="data-health-table">
              <thead>
                <tr>
                  <th>{copy.dataHealth.horizon}</th>
                  <th>{copy.dataHealth.activeRows}</th>
                  <th>{copy.dataHealth.snapshot}</th>
                  <th>{copy.dataHealth.closedLabels}</th>
                  <th>{copy.dataHealth.delayed}</th>
                  <th>{copy.dataHealth.trainable}</th>
                </tr>
              </thead>
              <tbody>
                {(data.horizons || []).map((horizon) => (
                  <tr key={horizon.horizon_days}>
                    <th scope="row">{copy.dataHealth.days(horizon.horizon_days)}</th>
                    <td>
                      {horizon.active_dataset_count}/{horizon.expected_dataset_count}
                    </td>
                    <td>{horizon.snapshot_count}</td>
                    <td>{horizon.outcome_count}</td>
                    <td>{horizon.overdue_count}</td>
                    <td>{horizon.ready_dataset_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </section>
  );
}

export default DataHealthPanel;

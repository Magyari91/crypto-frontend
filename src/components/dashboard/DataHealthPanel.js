import React from "react";
import {
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiDatabase,
  FiRefreshCw,
} from "react-icons/fi";
import { formatPercent } from "../../utils/formatters";

const healthStates = {
  healthy: { label: "Adatút rendben", icon: FiCheckCircle, tone: "ready" },
  collecting: { label: "Mintagyűjtés indul", icon: FiActivity, tone: "pending" },
  labeling_delayed: {
    label: "Címkézésre vár",
    icon: FiAlertTriangle,
    tone: "warning",
  },
  stale: { label: "Collector késik", icon: FiAlertTriangle, tone: "warning" },
  storage_warning: {
    label: "Tárhely figyelmeztetés",
    icon: FiDatabase,
    tone: "warning",
  },
  storage_critical: {
    label: "Tárhely kritikus",
    icon: FiAlertTriangle,
    tone: "warning",
  },
  storage_required: {
    label: "Tartós tárhely szükséges",
    icon: FiAlertTriangle,
    tone: "warning",
  },
};

function formatBytes(value) {
  if (value == null) return "-";
  const bytes = Number(value);
  if (!Number.isFinite(bytes) || bytes < 0) return "-";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1).replace(".", ",")} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2).replace(".", ",")} MB`;
}

function formatAge(value) {
  const minutes = Number(value);
  if (!Number.isFinite(minutes)) return "-";
  if (minutes < 1) return "most";
  if (minutes < 60) return `${Math.round(minutes)} perce`;
  return `${(minutes / 60).toFixed(1).replace(".", ",")} órája`;
}

function formatDate(value) {
  if (!value) return "nincs minta";
  return new Intl.DateTimeFormat("hu-HU", {
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
  const state = healthStates[data?.status] || healthStates.collecting;
  const StateIcon = state.icon;
  const totals = data?.totals || {};
  const storage = data?.storage || {};
  const collector = data?.collector || {};
  const storageDetail = storage.limit_bytes
    ? `${formatPercent(storage.utilization_pct)} kihasználtság`
    : "nincs megadott tárhelykeret";

  return (
    <section className="surface data-health-panel" aria-labelledby="data-health-title">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Éles tanítási adatút</span>
          <h2 id="data-health-title">Adatgyűjtés állapota</h2>
        </div>
        <div className="data-health-actions">
          {data && (
            <span className={`readiness-state ${state.tone}`}>
              <StateIcon aria-hidden="true" />
              {state.label}
            </span>
          )}
          <button
            type="button"
            className="icon-button compact"
            onClick={onRetry}
            disabled={loading || refreshing}
            aria-label="Adatgyűjtési állapot frissítése"
            title="Adatgyűjtési állapot frissítése"
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
          <span>Az adatút állapotának betöltése...</span>
        </div>
      ) : data ? (
        <>
          {error && <div className="data-health-inline-warning">{error}</div>}
          <div className="data-health-metrics">
            <HealthMetric
              label="Utolsó snapshot"
              value={formatAge(collector.latest_snapshot_age_minutes)}
              detail={`${formatDate(collector.latest_snapshot_at)} · ${collector.interval_minutes} perces ütem`}
            />
            <HealthMetric
              label="Aktív adatsor"
              value={`${totals.active_dataset_count || 0}/${totals.expected_dataset_count || 30}`}
              detail={`${formatPercent(totals.dataset_coverage_pct)} lefedettség`}
            />
            <HealthMetric
              label="Snapshot / címke"
              value={`${totals.snapshot_count || 0} / ${totals.outcome_count || 0}`}
              detail={`${totals.pending_count || 0} függő · ${totals.overdue_count || 0} lejárt`}
            />
            <HealthMetric
              label="PostgreSQL tárhely"
              value={`${formatBytes(storage.database_size_bytes)} / ${formatBytes(storage.limit_bytes)}`}
              detail={storageDetail}
            />
          </div>

          <div className="data-health-progress">
            <div>
              <span>Adatsor-lefedettség</span>
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
                  <th>Időtáv</th>
                  <th>Aktív sor</th>
                  <th>Snapshot</th>
                  <th>Lezárt címke</th>
                  <th>Késésben</th>
                  <th>Tanítható</th>
                </tr>
              </thead>
              <tbody>
                {(data.horizons || []).map((horizon) => (
                  <tr key={horizon.horizon_days}>
                    <th scope="row">{horizon.horizon_days} nap</th>
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

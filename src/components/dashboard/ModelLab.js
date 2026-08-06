import React, { useEffect, useRef, useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiCpu,
  FiPauseCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { fetchModelLab } from "../../services/api";
import { formatPercent } from "../../utils/formatters";


function CandidateStatus({ active }) {
  const Icon = active ? FiCheckCircle : FiPauseCircle;
  return (
    <span className={`lab-status ${active ? "active" : "standby"}`}>
      <Icon aria-hidden="true" />
      {active ? "Bekapcsolható jelölt" : "Tartalékban marad"}
    </span>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function DirectionCandidate({ candidate }) {
  return (
    <article className="lab-candidate">
      <header>
        <div>
          <small>Irányjelölt</small>
          <h3>{candidate.family}</h3>
        </div>
        <CandidateStatus active={candidate.active} />
      </header>
      <dl className="lab-metrics">
        <Metric label="Holdout-előny" value={formatPercent(candidate.validation_skill_pct, true)} />
        <Metric
          label="Aktív találati arány"
          value={
            candidate.holdout_directional_accuracy == null
              ? "Nincs aktív jel"
              : formatPercent(candidate.holdout_directional_accuracy)
          }
        />
        <Metric label="Jellefedettség" value={formatPercent(candidate.holdout_signal_coverage_pct)} />
        <Metric label="Tanítóminta" value={candidate.training_samples} />
      </dl>
      <p>{candidate.reason}</p>
    </article>
  );
}

function RiskCandidate({ candidate }) {
  return (
    <article className="lab-candidate">
      <header>
        <div>
          <small>Mozgási sáv</small>
          <h3>{candidate.family}</h3>
        </div>
        <CandidateStatus active={candidate.active} />
      </header>
      <dl className="lab-metrics">
        <Metric label="80%-os sáv" value={`±${formatPercent(candidate.range_pct)}`} />
        <Metric label="Holdout-előny" value={formatPercent(candidate.pinball_skill_pct, true)} />
        <Metric label="Tényleges lefedettség" value={formatPercent(candidate.holdout_coverage_pct)} />
        <Metric
          label="Stabil blokkok"
          value={`${candidate.positive_stability_folds}/${candidate.stability_folds}`}
        />
      </dl>
      <p>{candidate.reason}</p>
    </article>
  );
}

function ModelLab({ coin, horizon }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const controllerRef = useRef(null);

  useEffect(() => {
    controllerRef.current?.abort();
    setData(null);
    setLoading(false);
    setError("");
  }, [coin, horizon]);

  useEffect(
    () => () => {
      controllerRef.current?.abort();
    },
    []
  );

  const runLab = async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError("");
    try {
      const payload = await fetchModelLab({
        coin,
        horizon,
        signal: controller.signal,
      });
      setData(payload);
    } catch (requestError) {
      if (requestError.name !== "AbortError") {
        setError(requestError.message);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  return (
    <section className="surface model-lab-panel" aria-labelledby="model-lab-title">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Kísérleti órás modellek</span>
          <h2 id="model-lab-title">Modelllabor</h2>
        </div>
        <button
          type="button"
          className="model-lab-run"
          onClick={runLab}
          disabled={loading}
        >
          {loading ? <FiRefreshCw className="spin" aria-hidden="true" /> : <FiCpu aria-hidden="true" />}
          {loading ? "Ellenőrzés folyamatban" : data ? "Újraellenőrzés" : "Órás ellenőrzés"}
        </button>
      </div>

      {!data && !loading && !error && (
        <div className="lab-idle">
          <FiCpu aria-hidden="true" />
          <span>Nincs friss órás modellmérés</span>
        </div>
      )}
      {loading && (
        <div className="analytics-loading" role="status">
          <FiRefreshCw className="spin" aria-hidden="true" />
          <span>Az órás jelöltek időrendi ellenőrzése...</span>
        </div>
      )}
      {error && (
        <div className="analytics-error" role="alert">
          <FiAlertCircle aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
      {data && (
        <>
          <div className="lab-meta">
            <span>{data.source}</span>
            <strong>{data.history_hours} órás gyertya</strong>
          </div>
          <div className="lab-candidate-grid">
            <DirectionCandidate candidate={data.direction_candidate} />
            <RiskCandidate candidate={data.risk_candidate} />
          </div>
          <p className="methodology-note">{data.methodology}</p>
        </>
      )}
    </section>
  );
}

export default ModelLab;

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
import { useLanguage } from "../../i18n/LanguageContext";
import { translateApiText } from "../../i18n/apiText";


function CandidateStatus({ active }) {
  const { copy } = useLanguage();
  const Icon = active ? FiCheckCircle : FiPauseCircle;
  return (
    <span className={`lab-status ${active ? "active" : "standby"}`}>
      <Icon aria-hidden="true" />
      {active ? copy.modelLab.enabledCandidate : copy.modelLab.standby}
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
  const { copy, language } = useLanguage();
  return (
    <article className="lab-candidate">
      <header>
        <div>
          <small>{copy.modelLab.directionCandidate}</small>
          <h3>{translateApiText(candidate.family, language)}</h3>
        </div>
        <CandidateStatus active={candidate.active} />
      </header>
      <dl className="lab-metrics">
        <Metric label={copy.modelLab.holdoutSkill} value={formatPercent(candidate.validation_skill_pct, true)} />
        <Metric
          label={copy.modelLab.activeAccuracy}
          value={
            candidate.holdout_directional_accuracy == null
              ? copy.modelLab.noActiveSignal
              : formatPercent(candidate.holdout_directional_accuracy)
          }
        />
        <Metric label={copy.modelLab.signalCoverage} value={formatPercent(candidate.holdout_signal_coverage_pct)} />
        <Metric label={copy.modelLab.trainingSamples} value={candidate.training_samples} />
      </dl>
      <p>{translateApiText(candidate.reason, language)}</p>
    </article>
  );
}

function RiskCandidate({ candidate }) {
  const { copy, language } = useLanguage();
  return (
    <article className="lab-candidate">
      <header>
        <div>
          <small>{copy.modelLab.movementRange}</small>
          <h3>{translateApiText(candidate.family, language)}</h3>
        </div>
        <CandidateStatus active={candidate.active} />
      </header>
      <dl className="lab-metrics">
        <Metric label={copy.modelLab.interval80} value={`±${formatPercent(candidate.range_pct)}`} />
        <Metric label={copy.modelLab.holdoutSkill} value={formatPercent(candidate.pinball_skill_pct, true)} />
        <Metric label={copy.modelLab.actualCoverage} value={formatPercent(candidate.holdout_coverage_pct)} />
        <Metric
          label={copy.modelLab.stableBlocks}
          value={`${candidate.positive_stability_folds}/${candidate.stability_folds}`}
        />
      </dl>
      <p>{translateApiText(candidate.reason, language)}</p>
    </article>
  );
}

function ModelLab({ coin, horizon }) {
  const { copy, language } = useLanguage();
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
        errorMessages: copy.states,
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
          <span className="eyebrow">{copy.modelLab.eyebrow}</span>
          <h2 id="model-lab-title">{copy.modelLab.title}</h2>
        </div>
        <button
          type="button"
          className="model-lab-run"
          onClick={runLab}
          disabled={loading}
        >
          {loading ? <FiRefreshCw className="spin" aria-hidden="true" /> : <FiCpu aria-hidden="true" />}
          {loading ? copy.modelLab.checking : data ? copy.modelLab.recheck : copy.modelLab.run}
        </button>
      </div>

      {!data && !loading && !error && (
        <div className="lab-idle">
          <FiCpu aria-hidden="true" />
          <span>{copy.modelLab.idle}</span>
        </div>
      )}
      {loading && (
        <div className="analytics-loading" role="status">
          <FiRefreshCw className="spin" aria-hidden="true" />
          <span>{copy.modelLab.loading}</span>
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
            <strong>{copy.modelLab.candles(data.history_hours)}</strong>
          </div>
          <div className="lab-candidate-grid">
            <DirectionCandidate candidate={data.direction_candidate} />
            <RiskCandidate candidate={data.risk_candidate} />
          </div>
          <p className="methodology-note">{translateApiText(data.methodology, language)}</p>
        </>
      )}
    </section>
  );
}

export default ModelLab;

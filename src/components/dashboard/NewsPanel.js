import React from "react";
import {
  FiActivity,
  FiAlertCircle,
  FiArrowUpRight,
  FiClock,
  FiFileText,
  FiMinus,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";
import { formatNewsTime } from "../../utils/formatters";

const sentimentLabels = {
  positive: "Pozitív",
  neutral: "Semleges",
  negative: "Negatív",
};

const trendLabels = {
  improving: "Javuló",
  stable: "Stabil",
  deteriorating: "Gyengülő",
};

function SentimentIcon({ value }) {
  if (value === "positive" || value === "improving") {
    return <FiTrendingUp aria-hidden="true" />;
  }
  if (value === "negative" || value === "deteriorating") {
    return <FiTrendingDown aria-hidden="true" />;
  }
  return <FiMinus aria-hidden="true" />;
}

function signedScore(value) {
  const score = Number(value || 0);
  return `${score > 0 ? "+" : ""}${score.toFixed(2)}`;
}

function SentimentOverview({ sentiment, asset }) {
  if (!sentiment || !sentiment.sample_size) {
    return (
      <div className="sentiment-unavailable">
        <FiAlertCircle aria-hidden="true" />
        <span>A hírhangulat elemzéséhez még nincs elegendő adat.</span>
      </div>
    );
  }

  const label = sentimentLabels[sentiment.label] || sentimentLabels.neutral;
  const trend = trendLabels[sentiment.trend] || trendLabels.stable;
  const scope = sentiment.scope === "asset" && asset?.symbol
    ? `${asset.symbol} hírhangulat`
    : "Piaci hírhangulat";

  return (
    <div
      className={`sentiment-overview ${sentiment.label || "neutral"}`}
      aria-label="Hírhangulat összegzés"
    >
      <div className="sentiment-summary-grid">
        <div className="sentiment-primary">
          <span className="sentiment-icon" title="Összesített hangulatirány">
            <SentimentIcon value={sentiment.label} />
          </span>
          <div>
            <small>{scope}</small>
            <strong>{label}</strong>
          </div>
          <em>{signedScore(sentiment.score)}</em>
        </div>

        <div className="sentiment-stat">
          <small>Jelerősség</small>
          <strong>{Math.round(Number(sentiment.confidence_pct || 0))}%</strong>
          <span>szöveges bizonyíték</span>
        </div>

        <div className="sentiment-stat">
          <small>Lefedettség</small>
          <strong>{sentiment.sample_size} hír</strong>
          <span>{sentiment.source_count || 0} forrásból</span>
        </div>

        <div className={`sentiment-stat trend ${sentiment.trend || "stable"}`}>
          <small>Rövid távú trend</small>
          <strong><SentimentIcon value={sentiment.trend} />{trend}</strong>
          <span>{signedScore(sentiment.trend_delta)} változás</span>
        </div>
      </div>

      <div className="sentiment-distribution">
        <div className="sentiment-distribution-copy">
          <span><i className="positive" />Pozitív {sentiment.positive_pct || 0}%</span>
          <span><i className="neutral" />Semleges {sentiment.neutral_pct || 0}%</span>
          <span><i className="negative" />Negatív {sentiment.negative_pct || 0}%</span>
        </div>
        <div className="sentiment-distribution-track" aria-hidden="true">
          <span className="positive" style={{ width: `${sentiment.positive_pct || 0}%` }} />
          <span className="neutral" style={{ width: `${sentiment.neutral_pct || 0}%` }} />
          <span className="negative" style={{ width: `${sentiment.negative_pct || 0}%` }} />
        </div>
        <div className="sentiment-model-role" title="A sentiment még nem módosítja az előrejelzést">
          <FiActivity aria-hidden="true" />
          <span>Kontextusjel</span>
          <strong>{Number(sentiment.forecast_weight_pct || 0).toFixed(0)}% modell súly</strong>
        </div>
      </div>
    </div>
  );
}

function ArticleSentiment({ sentiment }) {
  if (!sentiment) return null;
  const value = sentiment.label || "neutral";
  return (
    <span className={`article-sentiment ${value}`}>
      <SentimentIcon value={value} />
      {sentimentLabels[value] || sentimentLabels.neutral}
      <em>{signedScore(sentiment.score)}</em>
    </span>
  );
}

function NewsPanel({ articles, sentiment, asset }) {
  const visibleArticles = articles.slice(0, 6);
  const visibleSourceCount = new Set(
    visibleArticles.map((article) => article.source).filter(Boolean)
  ).size;
  const sourceCount = sentiment?.source_count || visibleSourceCount;

  return (
    <section className="surface news-panel" id="news" aria-labelledby="news-title">
      <header className="panel-heading">
        <div>
          <span>Piaci hírek</span>
          <h2 id="news-title">Hírek és piaci hangulat</h2>
        </div>
        {sourceCount > 0 && <small>{sourceCount} hírforrás</small>}
      </header>

      <SentimentOverview sentiment={sentiment} asset={asset} />

      <div className="news-list">
        {articles.length === 0 && <p className="empty-copy">Jelenleg nincs elérhető hír.</p>}
        {visibleArticles.map((article) => (
          <article key={article.id || article.url}>
            <a className="news-card-link" href={article.url} target="_blank" rel="noreferrer">
              <div className="news-image">
                {article.image ? (
                  <img src={article.image} alt="" loading="lazy" />
                ) : (
                  <span><FiFileText aria-hidden="true" /></span>
                )}
              </div>
              <div className="news-content">
                <div className="news-meta">
                  <span>{article.source || "Kriptopiac"}</span>
                  {article.published_at && (
                    <time dateTime={article.published_at}>
                      <FiClock aria-hidden="true" />
                      {formatNewsTime(article.published_at)}
                    </time>
                  )}
                </div>
                <ArticleSentiment sentiment={article.sentiment} />
                <h3>
                  {article.title}
                  <FiArrowUpRight aria-hidden="true" />
                </h3>
                {article.summary && <p>{article.summary}</p>}
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default NewsPanel;

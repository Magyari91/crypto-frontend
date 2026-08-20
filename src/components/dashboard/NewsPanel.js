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
import { useLanguage } from "../../i18n/LanguageContext";

function SentimentIcon({ value }) {
  if (value === "positive" || value === "improving") {
    return <FiTrendingUp aria-hidden="true" />;
  }
  if (value === "negative" || value === "deteriorating") {
    return <FiTrendingDown aria-hidden="true" />;
  }
  return <FiMinus aria-hidden="true" />;
}

function signedScore(value, locale) {
  const score = Number(value || 0);
  return `${score > 0 ? "+" : ""}${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(score)}`;
}

function SentimentOverview({ sentiment, asset }) {
  const { copy, locale } = useLanguage();
  const sentimentLabels = {
    positive: copy.news.positive,
    neutral: copy.news.neutral,
    negative: copy.news.negative,
  };
  const trendLabels = {
    improving: copy.news.improving,
    stable: copy.news.stable,
    deteriorating: copy.news.deteriorating,
  };
  if (!sentiment || !sentiment.sample_size) {
    return (
      <div className="sentiment-unavailable">
        <FiAlertCircle aria-hidden="true" />
        <span>{copy.news.insufficient}</span>
      </div>
    );
  }

  const label = sentimentLabels[sentiment.label] || sentimentLabels.neutral;
  const trend = trendLabels[sentiment.trend] || trendLabels.stable;
  const scope = sentiment.scope === "asset" && asset?.symbol
    ? copy.news.assetSentiment(asset.symbol)
    : copy.news.marketSentiment;

  return (
    <div
      className={`sentiment-overview ${sentiment.label || "neutral"}`}
      aria-label={copy.news.summary}
    >
      <div className="sentiment-summary-grid">
        <div className="sentiment-primary">
          <span className="sentiment-icon" title={copy.news.direction}>
            <SentimentIcon value={sentiment.label} />
          </span>
          <div>
            <small>{scope}</small>
            <strong>{label}</strong>
          </div>
          <em>{signedScore(sentiment.score, locale)}</em>
        </div>

        <div className="sentiment-stat">
          <small>{copy.news.signalStrength}</small>
          <strong>{Math.round(Number(sentiment.confidence_pct || 0))}%</strong>
          <span>{copy.news.textualEvidence}</span>
        </div>

        <div className="sentiment-stat">
          <small>{copy.news.coverage}</small>
          <strong>{copy.news.articleCount(sentiment.sample_size)}</strong>
          <span>{copy.news.sourceCount(sentiment.source_count || 0)}</span>
        </div>

        <div className={`sentiment-stat trend ${sentiment.trend || "stable"}`}>
          <small>{copy.news.shortTrend}</small>
          <strong><SentimentIcon value={sentiment.trend} />{trend}</strong>
          <span>{signedScore(sentiment.trend_delta, locale)} {copy.news.change}</span>
        </div>
      </div>

      <div className="sentiment-distribution">
        <div className="sentiment-distribution-copy">
          <span><i className="positive" />{copy.news.positive} {sentiment.positive_pct || 0}%</span>
          <span><i className="neutral" />{copy.news.neutral} {sentiment.neutral_pct || 0}%</span>
          <span><i className="negative" />{copy.news.negative} {sentiment.negative_pct || 0}%</span>
        </div>
        <div className="sentiment-distribution-track" aria-hidden="true">
          <span className="positive" style={{ width: `${sentiment.positive_pct || 0}%` }} />
          <span className="neutral" style={{ width: `${sentiment.neutral_pct || 0}%` }} />
          <span className="negative" style={{ width: `${sentiment.negative_pct || 0}%` }} />
        </div>
        <div className="sentiment-model-role" title={copy.news.modelRoleTitle}>
          <FiActivity aria-hidden="true" />
          <span>{copy.news.contextSignal}</span>
          <strong>{Number(sentiment.forecast_weight_pct || 0).toFixed(0)}% {copy.news.modelWeight}</strong>
        </div>
      </div>
    </div>
  );
}

function ArticleSentiment({ sentiment }) {
  const { copy, locale } = useLanguage();
  if (!sentiment) return null;
  const value = sentiment.label || "neutral";
  return (
    <span className={`article-sentiment ${value}`}>
      <SentimentIcon value={value} />
      {copy.news[value] || copy.news.neutral}
      <em>{signedScore(sentiment.score, locale)}</em>
    </span>
  );
}

function NewsPanel({ articles, sentiment, asset }) {
  const { copy } = useLanguage();
  const visibleArticles = articles.slice(0, 6);
  const visibleSourceCount = new Set(
    visibleArticles.map((article) => article.source).filter(Boolean)
  ).size;
  const sourceCount = sentiment?.source_count || visibleSourceCount;

  return (
    <section className="surface news-panel" id="news" aria-labelledby="news-title">
      <header className="panel-heading">
        <div>
          <span>{copy.news.eyebrow}</span>
          <h2 id="news-title">{copy.news.title}</h2>
        </div>
        {sourceCount > 0 && <small>{copy.news.newsSources(sourceCount)}</small>}
      </header>

      <SentimentOverview sentiment={sentiment} asset={asset} />

      <div className="news-list">
        {articles.length === 0 && <p className="empty-copy">{copy.news.empty}</p>}
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
                  <span>{article.source || copy.news.defaultSource}</span>
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

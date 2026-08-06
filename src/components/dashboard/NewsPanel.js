import React from "react";
import { FiArrowUpRight, FiClock, FiFileText } from "react-icons/fi";
import { formatNewsTime } from "../../utils/formatters";

function NewsPanel({ articles }) {
  const visibleArticles = articles.slice(0, 6);
  const sourceCount = new Set(visibleArticles.map((article) => article.source).filter(Boolean)).size;

  return (
    <section className="surface news-panel" id="news" aria-labelledby="news-title">
      <header className="panel-heading">
        <div>
          <span>Piaci hírek</span>
          <h2 id="news-title">Legfrissebb információk</h2>
        </div>
        {sourceCount > 0 && <small>{sourceCount} ellenőrzött hírforrás</small>}
      </header>

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

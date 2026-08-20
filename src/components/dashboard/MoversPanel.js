import React from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { formatPercent, formatPrice } from "../../utils/formatters";
import { useLanguage } from "../../i18n/LanguageContext";

function directionClass(value) {
  if (value == null || !Number.isFinite(Number(value))) return "";
  return Number(value) >= 0 ? "positive" : "negative";
}

function MoverList({ title, rows, type }) {
  const positive = type === "gainers";
  const Icon = positive ? FiArrowUp : FiArrowDown;
  return (
    <div className="mover-column">
      <h3 className={positive ? "" : "negative"}>
        <Icon aria-hidden="true" />
        {title}
      </h3>
      <ul>
        {rows.map((row) => (
          <li key={row.id}>
            {row.image ? (
              <img src={row.image} alt="" loading="lazy" />
            ) : (
              <span className="mover-symbol-avatar" aria-hidden="true">
                {row.symbol.slice(0, 1)}
              </span>
            )}
            <span>
              <strong>{row.symbol}</strong>
              <small>{formatPrice(row.current_price)}</small>
            </span>
            <em className={directionClass(row.change_24h)}>
              {formatPercent(row.change_24h, true)}
            </em>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MoversPanel({ movers }) {
  const { copy } = useLanguage();
  return (
    <section className="surface movers-panel" aria-labelledby="movers-title">
      <header className="panel-heading">
        <div>
          <span>{copy.movers.eyebrow}</span>
          <h2 id="movers-title">{copy.movers.title}</h2>
        </div>
      </header>
      <div className="movers-grid">
        <MoverList title={copy.movers.gainers} rows={movers.gainers} type="gainers" />
        <MoverList title={copy.movers.losers} rows={movers.losers} type="losers" />
      </div>
    </section>
  );
}

export default MoversPanel;

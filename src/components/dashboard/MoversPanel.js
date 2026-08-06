import React from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { formatPercent, formatPrice } from "../../utils/formatters";

function MoverList({ title, rows, type }) {
  const positive = type === "gainers";
  const Icon = positive ? FiArrowUp : FiArrowDown;
  return (
    <div className="mover-column">
      <h3 className={positive ? "positive" : "negative"}>
        <Icon aria-hidden="true" />
        {title}
      </h3>
      <ul>
        {rows.map((row) => (
          <li key={row.id}>
            <img src={row.image} alt="" loading="lazy" />
            <span>
              <strong>{row.symbol}</strong>
              <small>{formatPrice(row.current_price)}</small>
            </span>
            <em className={positive ? "positive" : "negative"}>
              {formatPercent(row.change_24h, true)}
            </em>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MoversPanel({ movers }) {
  return (
    <section className="surface movers-panel" aria-labelledby="movers-title">
      <header className="panel-heading">
        <div>
          <span>24 órás mozgás</span>
          <h2 id="movers-title">Piaci szélsőértékek</h2>
        </div>
      </header>
      <div className="movers-grid">
        <MoverList title="Emelkedők" rows={movers.gainers} type="gainers" />
        <MoverList title="Csökkenők" rows={movers.losers} type="losers" />
      </div>
    </section>
  );
}

export default MoversPanel;

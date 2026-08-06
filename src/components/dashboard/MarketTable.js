import React from "react";
import { formatCompactCurrency, formatPercent, formatPrice } from "../../utils/formatters";

function MarketTable({ rows, selectedCoin }) {
  return (
    <section className="surface market-panel" id="market" aria-labelledby="market-title">
      <header className="panel-heading">
        <div>
          <span>Piaclista</span>
          <h2 id="market-title">Vezető kriptovaluták</h2>
        </div>
        <small>Rangsor piaci érték alapján</small>
      </header>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Eszköz</th>
              <th>Ár</th>
              <th>24 óra</th>
              <th>7 nap</th>
              <th>Piaci érték</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const change24Positive = row.change_24h >= 0;
              const change7Positive = row.change_7d >= 0;
              return (
                <tr className={row.id === selectedCoin ? "selected-row" : ""} key={row.id}>
                  <td>{row.market_cap_rank}</td>
                  <td>
                    <div className="coin-cell">
                      <img src={row.image} alt="" loading="lazy" />
                      <span>
                        <strong>{row.name}</strong>
                        <small>{row.symbol}</small>
                      </span>
                    </div>
                  </td>
                  <td>{formatPrice(row.current_price)}</td>
                  <td className={change24Positive ? "positive" : "negative"}>
                    {formatPercent(row.change_24h, true)}
                  </td>
                  <td className={change7Positive ? "positive" : "negative"}>
                    {formatPercent(row.change_7d, true)}
                  </td>
                  <td>{formatCompactCurrency(row.market_cap)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default MarketTable;

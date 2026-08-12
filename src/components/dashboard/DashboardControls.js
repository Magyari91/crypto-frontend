import React from "react";
import { FiRefreshCw, FiSliders } from "react-icons/fi";

const fallbackCoins = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "binancecoin", symbol: "BNB", name: "BNB" },
  { id: "ripple", symbol: "XRP", name: "XRP" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "tron", symbol: "TRX", name: "TRON" },
  { id: "hyperliquid", symbol: "HYPE", name: "Hyperliquid" },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin" },
  { id: "zcash", symbol: "ZEC", name: "Zcash" },
  { id: "cardano", symbol: "ADA", name: "Cardano" },
];

function riskLabel(value) {
  if (value <= 3) return "Óvatos";
  if (value <= 7) return "Kiegyensúlyozott";
  return "Magas tűrés";
}

function DashboardControls({
  coin,
  onCoinChange,
  horizon,
  onHorizonChange,
  risk,
  onRiskChange,
  supportedCoins,
  refreshing,
  onRefresh,
}) {
  const coins = supportedCoins?.length ? supportedCoins : fallbackCoins;

  return (
    <section className="control-bar" aria-label="Dashboard beállítások">
      <div className="asset-switcher" aria-label="Kriptovaluta kiválasztása">
        {coins.map((item) => (
          <button
            type="button"
            key={item.id}
            className={coin === item.id ? "active" : ""}
            aria-pressed={coin === item.id}
            onClick={() => onCoinChange(item.id)}
            title={item.name}
          >
            {item.symbol}
          </button>
        ))}
      </div>

      <label className="control-field">
        <span>Időtáv</span>
        <select value={horizon} onChange={(event) => onHorizonChange(Number(event.target.value))}>
          <option value={1}>24 óra</option>
          <option value={7}>7 nap</option>
          <option value={30}>30 nap</option>
        </select>
      </label>

      <label className="risk-control">
        <span className="risk-label">
          <FiSliders aria-hidden="true" />
          Saját kockázati profil
        </span>
        <input
          type="range"
          min="1"
          max="10"
          value={risk}
          onChange={(event) => onRiskChange(Number(event.target.value))}
        />
        <strong>{riskLabel(risk)}</strong>
      </label>

      <button
        type="button"
        className="icon-button refresh-button"
        onClick={onRefresh}
        aria-label="Adatok frissítése"
        title="Adatok frissítése"
        disabled={refreshing}
      >
        <FiRefreshCw className={refreshing ? "spin" : ""} aria-hidden="true" />
      </button>
    </section>
  );
}

export default DashboardControls;

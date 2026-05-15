import React from "react";
import { FaBitcoin, FaChartLine, FaClock, FaEthereum, FaExclamationTriangle, FaRobot, FaSatelliteDish, FaShieldAlt, FaSignal } from "react-icons/fa";
import { SiDogecoin } from "react-icons/si";

const FORECAST_DATA = {
  BTC: {
    name: "Bitcoin",
    icon: <FaBitcoin />,
    price: "$104,820",
    forecast: "Bullish continuation",
    bias: "+4.8%",
    confidence: 72,
    volatility: "Medium",
    support: "$98,400",
    resistance: "$109,700",
    timeFrame: "7 day outlook",
    model: "Trend plus momentum model",
    signals: ["Price above short term trend", "Momentum remains positive", "Resistance zone is close"],
  },
  ETH: {
    name: "Ethereum",
    icon: <FaEthereum />,
    price: "$3,780",
    forecast: "Accumulation phase",
    bias: "+3.1%",
    confidence: 66,
    volatility: "Medium high",
    support: "$3,520",
    resistance: "$3,980",
    timeFrame: "7 day outlook",
    model: "RSI and moving average model",
    signals: ["Trend recovery is active", "Volume confirmation is moderate", "Market structure is improving"],
  },
  DOGE: {
    name: "Dogecoin",
    icon: <SiDogecoin />,
    price: "$0.168",
    forecast: "Speculative upside",
    bias: "+6.6%",
    confidence: 58,
    volatility: "High",
    support: "$0.148",
    resistance: "$0.184",
    timeFrame: "7 day outlook",
    model: "Sentiment and momentum model",
    signals: ["Volatility is elevated", "Short term trend is reactive", "Risk control is important"],
  },
};

const coins = ["BTC", "ETH", "DOGE"];

function CryptoForecastFaceplate({ selectedCoin, setSelectedCoin, darkMode }) {
  const data = FORECAST_DATA[selectedCoin] || FORECAST_DATA.BTC;

  return (
    <section className={`forecast-faceplate ${darkMode ? "forecast-faceplate-dark" : "forecast-faceplate-light"}`}>
      <div className="forecast-grid-overlay" />

      <div className="forecast-faceplate-header">
        <div>
          <div className="forecast-kicker">
            <FaRobot />
            AI crypto forecast faceplate
          </div>
          <h1>CryptoVision Forecast Control Panel</h1>
          <p>
            A professional forecast dashboard for monitoring trend direction, confidence, support,
            resistance, and short term trading risk.
          </p>
        </div>

        <div className="forecast-system-status">
          <span className="status-dot" />
          <div>
            <strong>Forecast engine</strong>
            <small>Online and ready</small>
          </div>
        </div>
      </div>

      <div className="forecast-main-panel">
        <div className="forecast-asset-card">
          <div className="asset-topline">
            <div className="asset-icon">{data.icon}</div>
            <div>
              <span className="asset-symbol">{selectedCoin}</span>
              <h2>{data.name}</h2>
            </div>
          </div>

          <div className="price-block">
            <span>Reference price</span>
            <strong>{data.price}</strong>
          </div>

          <div className="coin-selector-panel" aria-label="Select cryptocurrency">
            {coins.map((coin) => (
              <button
                key={coin}
                type="button"
                onClick={() => setSelectedCoin(coin)}
                className={selectedCoin === coin ? "active" : ""}
              >
                {coin}
              </button>
            ))}
          </div>
        </div>

        <div className="forecast-decision-card">
          <div className="decision-label">
            <FaChartLine />
            Forecast decision
          </div>
          <h2>{data.forecast}</h2>
          <div className="bias-value">{data.bias}</div>
          <p>{data.timeFrame}</p>

          <div className="confidence-meter" style={{ "--confidence": `${data.confidence}%` }}>
            <div className="confidence-meter-fill" />
          </div>
          <div className="confidence-row">
            <span>Model confidence</span>
            <strong>{data.confidence}%</strong>
          </div>
        </div>

        <div className="forecast-metrics-card">
          <Metric icon={<FaShieldAlt />} label="Support" value={data.support} />
          <Metric icon={<FaSignal />} label="Resistance" value={data.resistance} />
          <Metric icon={<FaExclamationTriangle />} label="Volatility" value={data.volatility} />
          <Metric icon={<FaClock />} label="Horizon" value={data.timeFrame} />
        </div>
      </div>

      <div className="forecast-bottom-row">
        <div className="model-card">
          <div className="model-card-title">
            <FaSatelliteDish />
            Active model
          </div>
          <strong>{data.model}</strong>
          <p>
            This panel is prepared for connection to a backend forecast endpoint, where live prices,
            model output, and confidence values can replace the current frontend placeholders.
          </p>
        </div>

        <div className="signal-card">
          <h3>Signal explanation</h3>
          <ul>
            {data.signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="forecast-metric">
      <span>{icon}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

export default CryptoForecastFaceplate;

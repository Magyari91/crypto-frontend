import React, { useState } from "react";
import TradingViewWidget from "./components/TradingViewWidget";
import MarketOverview from "./components/MarketOverview";
import TopMovers from "./components/TopMovers";
import CoinList from "./components/CoinList";
import NewsSection from "./components/NewsSection";
import Heatmap from "./components/Heatmap";
import TechnicalIndicators from "./components/TechnicalIndicators";
import ModernNavbar from "./components/ModernNavbar";
import CryptoForecastFaceplate from "./components/CryptoForecastFaceplate";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState("BTC");

  const coinMap = {
    BTC: "bitcoin",
    ETH: "ethereum",
    DOGE: "dogecoin",
  };

  return (
    <div className={darkMode ? "app-shell app-shell-dark" : "app-shell app-shell-light"}>
      <ModernNavbar darkMode={darkMode} setDarkMode={setDarkMode} onSearch={() => {}} />

      <main className="dashboard-layout">
        <CryptoForecastFaceplate
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
          darkMode={darkMode}
        />

        <MarketOverview darkMode={darkMode} />

        <div className="dashboard-section-grid">
          <section className="dashboard-card">
            <div className="section-heading">
              <span>Market heat</span>
              <h2>Crypto Heatmap</h2>
            </div>
            <Heatmap darkMode={darkMode} />
          </section>

          <section className="dashboard-card dashboard-card-wide">
            <div className="section-heading">
              <span>24 hour movement</span>
              <h2>Top Movers</h2>
            </div>
            <TopMovers darkMode={darkMode} />
          </section>
        </div>

        <section className="dashboard-card">
          <div className="section-heading">
            <span>Market list</span>
            <h2>Tracked Cryptocurrencies</h2>
          </div>
          <CoinList darkMode={darkMode} />
        </section>

        <section className="dashboard-card">
          <div className="section-heading">
            <span>Crypto news</span>
            <h2>Latest Market Information</h2>
          </div>
          <NewsSection darkMode={darkMode} />
        </section>

        <section className="dashboard-card technical-panel">
          <div className="section-heading centered">
            <span>Technical workstation</span>
            <h2>{selectedCoin} Technical Analysis</h2>
          </div>

          <div className="coin-selector-modern">
            {["BTC", "ETH", "DOGE"].map((coin) => (
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

          <div className="chart-frame">
            <TradingViewWidget
              symbol={`${selectedCoin}USDT`}
              indicators={["Fibonacci", "Ichimoku", "RSI"]}
              darkMode={darkMode}
            />
          </div>

          <TechnicalIndicators coin={coinMap[selectedCoin]} darkMode={darkMode} />
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>CryptoVision Forecast Dashboard | Educational market analysis interface</p>
      </footer>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import TradingViewWidget from "./components/TradingViewWidget";
import MarketOverview from "./components/MarketOverview";
import TopMovers from "./components/TopMovers";
import CoinList from "./components/CoinList";
import NewsSection from "./components/NewsSection";
import Heatmap from "./components/Heatmap";
import TechnicalIndicators from "./components/TechnicalIndicators";
import ModernNavbar from "./components/ModernNavbar";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState("BTC");

  const coinMap = {
    BTC: "bitcoin",
    ETH: "ethereum",
    DOGE: "dogecoin",
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      
      {/* 🔹 Modernizált Felső Navigációs Sáv */}
      <ModernNavbar darkMode={darkMode} setDarkMode={setDarkMode} onSearch={() => {}} />

      {/* 🔹 Piaci Összegzés */}
      <MarketOverview darkMode={darkMode} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-6">
        {/* 🔹 Hőtérkép */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">🌡️ Kripto Hőtérkép</h2>
          <Heatmap darkMode={darkMode} />
        </div>

        {/* 🔹 Top Movers */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg md:col-span-2">
          <h2 className="text-xl font-bold text-center mb-4">📈 Legnagyobb Mozgások (24h)</h2>
          <TopMovers darkMode={darkMode} />
        </div>
      </div>

      {/* 🔹 Coin Lista */}
      <div className="mx-6 mt-6">
        <CoinList darkMode={darkMode} />
      </div>

      {/* 🔹 Kripto Hírek */}
      <div className="mx-6 mt-6">
        <NewsSection darkMode={darkMode} />
      </div>

      {/* 🔹 Technikai Elemzés */}
      <div className="mt-6 mx-6">
        <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className="text-xl font-bold text-center mb-6">📊 Technikai Elemzés</h2>
          
          {/* Coin választó gombok */}
          <div className="flex justify-center flex-wrap gap-4 mb-6">
            {["BTC", "ETH", "DOGE"].map((coin) => (
              <button
                key={coin}
                onClick={() => setSelectedCoin(coin)}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  selectedCoin === coin
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                }`}
              >
                {coin}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-lg overflow-hidden mb-6">
            <TradingViewWidget
              symbol={`${selectedCoin}USDT`}
              indicators={["Fibonacci", "Ichimoku", "RSI"]}
              darkMode={darkMode}
            />
          </div>

          {/* Technikai indikátorok – coinMap alapján */}
          <TechnicalIndicators coin={coinMap[selectedCoin]} darkMode={darkMode} />
        </div>
      </div>

      {/* 🔹 Lábjegyzet */}
      <footer className="mt-10 text-center text-gray-400">
        <p>🚀 CryptoVision | Minden jog fenntartva © 2025</p>
      </footer>
    </div>
  );
}

export default App;

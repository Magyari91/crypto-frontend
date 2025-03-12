import React, { useEffect, useState } from "react";
import TradingViewWidget from "./components/TradingViewWidget";
import MarketOverview from "./components/MarketOverview";
import TopMovers from "./components/TopMovers";
import CoinList from "./components/CoinList";
import NewsSection from "./components/NewsSection";
import Heatmap from "./components/Heatmap"; // 🔥 Hőtérkép komponens importálása
import { Switch } from "@headlessui/react";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState("BTC");

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      
      {/* 🔹 Felső Navigációs Sáv */}
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          CryptoVision
        </h1>
        <input className="p-2 rounded-md text-black" placeholder="Keresés..." />
        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          className={`${darkMode ? "bg-blue-500" : "bg-gray-300"} relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span className="sr-only">Mód váltás</span>
          <span className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition`} />
        </Switch>
      </div>

      {/* 🔹 Piaci Áttekintés */}
      <MarketOverview darkMode={darkMode} />

      {/* 🔹 Hőtérkép (Heatmap) – PIACI MOZGÁSOK */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">🌡️ Kripto Hőtérkép</h2>
        <Heatmap darkMode={darkMode} />
      </div>

      {/* 🔹 Top Movers (Nyertesek és Vesztesek) */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">📈 Legnagyobb Mozgások (24h)</h2>
        <TopMovers darkMode={darkMode} />
      </div>

      {/* 🔹 Coin Lista */}
      <CoinList darkMode={darkMode} />

      {/* 🔹 Hírek szekció */}
      <NewsSection darkMode={darkMode} />

      {/* 🔹 Technikai Elemzés Grafikon */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">📊 Technikai Elemzés</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setSelectedCoin("BTC")}
            className={`px-4 py-2 rounded-full ${
              selectedCoin === "BTC" ? "bg-blue-500 text-white" : "bg-gray-600"
            }`}
          >
            Bitcoin
          </button>
          <button
            onClick={() => setSelectedCoin("ETH")}
            className={`px-4 py-2 rounded-full ${
              selectedCoin === "ETH" ? "bg-purple-500 text-white" : "bg-gray-600"
            }`}
          >
            Ethereum
          </button>
          <button
            onClick={() => setSelectedCoin("DOGE")}
            className={`px-4 py-2 rounded-full ${
              selectedCoin === "DOGE" ? "bg-yellow-500 text-white" : "bg-gray-600"
            }`}
          >
            Dogecoin
          </button>
        </div>
        <TradingViewWidget
          symbol={`${selectedCoin}USDT`}
          indicators={["Fibonacci", "Ichimoku", "RSI"]}
          darkMode={darkMode}
        />
      </div>

    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import TradingViewWidget from "./components/TradingViewWidget";
import MarketOverview from "./components/MarketOverview";
import TopMovers from "./components/TopMovers";
import CoinList from "./components/CoinList";
import NewsSection from "./components/NewsSection";
import Heatmap from "./components/Heatmap"; // 🔥 Hőtérkép importálása
import { Switch } from "@headlessui/react";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState("BTC");

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      
      {/* 🔹 Felső Navigációs Sáv */}
      <div className="p-4 flex justify-between items-center bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          CryptoVision 🚀
        </h1>
        <input 
          className="p-2 rounded-md text-black w-60 placeholder-gray-500"
          placeholder="🔍 Keresés kriptovaluták között..." 
        />
        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          className={`${darkMode ? "bg-blue-500" : "bg-gray-300"} relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span className="sr-only">Mód váltás</span>
          <span className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition`} />
        </Switch>
      </div>

      {/* 🔹 Piaci Összegzés */}
      <MarketOverview darkMode={darkMode} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-6">
        {/* 🔹 Hőtérkép (Heatmap) */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">🌡️ Kripto Hőtérkép</h2>
          <Heatmap darkMode={darkMode} />
        </div>

        {/* 🔹 Top Movers (Nyertesek és Vesztesek) */}
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
      <div className="mt-6 mx-6 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">📊 Technikai Elemzés</h2>
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setSelectedCoin("BTC")}
            className={`px-4 py-2 rounded-full ${selectedCoin === "BTC" ? "bg-blue-500 text-white shadow-lg" : "bg-gray-600 hover:bg-gray-500"}`}
          >
            Bitcoin
          </button>
          <button
            onClick={() => setSelectedCoin("ETH")}
            className={`px-4 py-2 rounded-full ${selectedCoin === "ETH" ? "bg-purple-500 text-white shadow-lg" : "bg-gray-600 hover:bg-gray-500"}`}
          >
            Ethereum
          </button>
          <button
            onClick={() => setSelectedCoin("DOGE")}
            className={`px-4 py-2 rounded-full ${selectedCoin === "DOGE" ? "bg-yellow-500 text-white shadow-lg" : "bg-gray-600 hover:bg-gray-500"}`}
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

      {/* 🔹 Lábjegyzet */}
      <footer className="mt-10 text-center text-gray-400">
        <p>🚀 CryptoVision | Minden jog fenntartva © 2025</p>
      </footer>

    </div>
  );
}

export default App;

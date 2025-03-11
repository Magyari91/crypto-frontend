import React, { useEffect, useState } from "react";
import TradingViewWidget from "./components/TradingViewWidget";
import MarketOverview from "./components/MarketOverview";
import TopMovers from "./components/TopMovers";
import CoinList from "./components/CoinList";
import NewsSection from "./components/NewsSection"; // Új komponens a hírekhez
import { Switch } from "@headlessui/react";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">💰 Kripto Piac</h1>
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

      <MarketOverview darkMode={darkMode} />
      <TopMovers darkMode={darkMode} />
      <CoinList darkMode={darkMode} />
      <NewsSection darkMode={darkMode} />

      <div className="mt-6">
        <h2 className="text-xl font-bold text-center">Bitcoin Árfolyam</h2>
        <TradingViewWidget symbol="BINANCE:BTCUSDT" darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;

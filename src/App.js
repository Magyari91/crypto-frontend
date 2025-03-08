import React, { useEffect, useState } from "react";
import TradingViewWidget from "./TradingViewWidget";
import { Switch } from "@headlessui/react";

function App() {
  const [cryptoData, setCryptoData] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [days, setDays] = useState(365);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetch("https://crypto-backend-pv99.onrender.com/crypto")
      .then((response) => response.json())
      .then((data) => {
        setCryptoData(data);
      })
      .catch((error) => console.error("Hiba az API lekérdezésekor:", error));
  }, []);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <div className="flex flex-col items-center p-4">
        <div className="flex justify-between items-center w-full max-w-4xl">
          <h1 className="text-2xl font-bold">💰 Kripto Piac</h1>
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className={`${darkMode ? "bg-blue-500" : "bg-gray-300"} relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span className="sr-only">Mód váltás</span>
            <span className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition`} />
          </Switch>
        </div>
        <div className="mt-4 w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          {cryptoData ? (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg">🪙 <strong>BTC</strong></p>
                <p>${cryptoData.btc_price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-lg">🪙 <strong>ETH</strong></p>
                <p>${cryptoData.eth_price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-lg">🪙 <strong>DOGE</strong></p>
                <p>${cryptoData.doge_price.toFixed(4)}</p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400">Adatok betöltése...</p>
          )}
        </div>
        <div className="mt-4 w-full max-w-4xl">
          <h2 className="text-xl font-bold text-center">{selectedCoin.toUpperCase()} árfolyam</h2>
          <TradingViewWidget symbol={selectedCoin} darkMode={darkMode} />
        </div>
        <div className="mt-4 flex space-x-4">
          <button className={`px-4 py-2 rounded ${selectedCoin === "bitcoin" ? "bg-blue-500" : "bg-gray-600"}`} onClick={() => setSelectedCoin("bitcoin")}>
            Bitcoin
          </button>
          <button className={`px-4 py-2 rounded ${selectedCoin === "ethereum" ? "bg-blue-500" : "bg-gray-600"}`} onClick={() => setSelectedCoin("ethereum")}>
            Ethereum
          </button>
          <button className={`px-4 py-2 rounded ${selectedCoin === "dogecoin" ? "bg-blue-500" : "bg-gray-600"}`} onClick={() => setSelectedCoin("dogecoin")}>
            Dogecoin
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

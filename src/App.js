import React, { useEffect, useState, useCallback } from "react";
import TradingViewWidget from "./components/TradingViewWidget";
import CryptoCard from "./components/CryptoCard";
import SearchBar from "./components/SearchBar";
import { Switch } from "@headlessui/react";
import axios from 'axios';
import MarketOverview from './components/MarketOverview';
import TopMovers from './components/TopMovers';
import CoinList from './components/CoinList';

const API_URL = "https://crypto-backend-pv99.onrender.com/crypto";

function App() {
  const [cryptoData, setCryptoData] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    axios.get(API_URL)
      .then((response) => {
        setCryptoData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hiba az API lekérdezésekor:", error);
        setError("Hiba történt az adatok lekérésekor.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCoinSelect = (coinId) => {
    setSelectedCoin(coinId);
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-gray-100 min-h-screen transition-colors duration-300" : "bg-gray-50 text-gray-900 min-h-screen transition-colors duration-300"}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-6xl flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              CryptoVision
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm">{darkMode ? ' Sötét' : '☀️ Világos'}</span>
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                className={`${darkMode ? 'bg-blue-500' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300`}
              >
                <span className="sr-only">Mód váltás</span>
                <span className={`${darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300`} />
              </Switch>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <MarketOverview darkMode={darkMode} />
            </div>
            <div className="md:col-span-1">
              <TopMovers darkMode={darkMode} />
            </div>
            <div className="md:col-span-1">
              <CoinList darkMode={darkMode} />
            </div>
          </div>

          <SearchBar onSelect={handleCoinSelect} />

          <div className="w-full max-w-6xl mb-12">
            <div className={`p-8 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-2xl transition-all duration-300 hover:shadow-xl`}>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-400">Adatok betöltése...</p>
                </div>
              ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
              ) : cryptoData ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <CryptoCard coin="BTC" data={cryptoData.btc_price} darkMode={darkMode} />
                  <CryptoCard coin="ETH" data={cryptoData.eth_price} darkMode={darkMode} />
                  <CryptoCard coin="DOGE" data={cryptoData.doge_price} darkMode={darkMode} />
                </div>
              ) : null}
            </div>
          </div>

          <div className="w-full max-w-6xl mb-8">
            <div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl`}>
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold mb-4 md:mb-0">
                  {selectedCoin.toUpperCase()} árfolyam diagram
                </h2>
                <div className="flex gap-3">
                  <button onClick={() => setSelectedCoin("bitcoin")} className={`px-6 py-2 rounded-full transition-all duration-200 ${selectedCoin === "bitcoin" ? "bg-blue-500 text-white shadow-lg" : darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}>Bitcoin</button>
                  <button onClick={() => setSelectedCoin("ethereum")} className={`px-6 py-2 rounded-full transition-all duration-200 ${selectedCoin === "ethereum" ? "bg-purple-500 text-white shadow-lg" : darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}>Ethereum</button>
                  <button onClick={() => setSelectedCoin("dogecoin")} className={`px-6 py-2 rounded-full transition-all duration-200 ${selectedCoin === "dogecoin" ? "bg-yellow-500 text-white shadow-lg" : darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}>Dogecoin</button>
                </div>
              </div>
              <TradingViewWidget symbol={`${selectedCoin.toUpperCase()}USDT`} darkMode={darkMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
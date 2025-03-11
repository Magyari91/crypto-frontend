import React, { useEffect, useState, useCallback } from "react";
import TradingViewWidget from "./components/TradingViewWidget";
import { CryptoCard } from "./components/CryptoCard";
import SearchBar from "./components/SearchBar";
import { Switch } from "@headlessui/react";
import axios from "axios";
import MarketOverview from "./components/MarketOverview";
import TopMovers from "./components/TopMovers";
import CoinList from "./components/CoinList";
import Navbar from "./components/Navbar";
import CryptoNews from "./components/CryptoNews"; // Hírek importálása

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
    axios
      .get(API_URL)
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
    <div
      className={
        darkMode
          ? "dark bg-gray-900 text-gray-100 min-h-screen transition-colors duration-300"
          : "bg-gray-50 text-gray-900 min-h-screen transition-colors duration-300"
      }
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} /> {/* ÚJ: Navbar */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <SearchBar onSelect={handleCoinSelect} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-6">
            <div className="md:col-span-2">
              <MarketOverview darkMode={darkMode} />
            </div>
            <div className="md:col-span-1">
              <TopMovers darkMode={darkMode} />
            </div>
            <div className="md:col-span-3">
              <CoinList darkMode={darkMode} />
            </div>
          </div>

          <div className="w-full max-w-6xl mt-8">
            <CryptoNews darkMode={darkMode} /> {/* ÚJ: Hírek szekció */}
          </div>

          <div className="w-full max-w-6xl mt-8 mb-8">
            <div
              className={`p-6 rounded-2xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-xl`}
            >
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold mb-4 md:mb-0">
                  {selectedCoin.toUpperCase()} árfolyam diagram
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCoin("bitcoin")}
                    className={`px-6 py-2 rounded-full transition-all duration-200 ${
                      selectedCoin === "bitcoin"
                        ? "bg-blue-500 text-white shadow-lg"
                        : darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    Bitcoin
                  </button>
                  <button
                    onClick={() => setSelectedCoin("ethereum")}
                    className={`px-6 py-2 rounded-full transition-all duration-200 ${
                      selectedCoin === "ethereum"
                        ? "bg-purple-500 text-white shadow-lg"
                        : darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    Ethereum
                  </button>
                  <button
                    onClick={() => setSelectedCoin("dogecoin")}
                    className={`px-6 py-2 rounded-full transition-all duration-200 ${
                      selectedCoin === "dogecoin"
                        ? "bg-yellow-500 text-white shadow-lg"
                        : darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    Dogecoin
                  </button>
                </div>
              </div>
              <TradingViewWidget
                symbol={`${selectedCoin.toUpperCase()}USDT`}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

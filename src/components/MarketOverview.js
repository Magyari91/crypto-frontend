import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://crypto-backend-pv99.onrender.com/market-overview"; // 🔹 Backend API

function MarketOverview({ darkMode }) {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL);
        if (response.data) {
          setMarketData(response.data);
        } else {
          setError("Nem sikerült lekérni a piaci adatokat.");
        }
      } catch (err) {
        console.error("Adatlekérési hiba:", err);
        setError("Hiba történt az adatok lekérésekor.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // 🔹 1 percenként frissítés

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <p className="text-center text-gray-400">🔄 Adatok betöltése...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className={`p-4 rounded-2xl ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-xl mb-8`}>
      <h2 className="text-xl font-bold mb-4 text-center md:text-left">📊 Piaci Összegzés</h2>
      {marketData ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {/* 🔹 Teljes Piaci Kapitalizáció */}
          <div>
            <p className="text-sm text-gray-400">🌍 Teljes Market Cap</p>
            <p className="text-lg font-semibold">
              ${marketData.market_cap_total ? marketData.market_cap_total.toLocaleString() : "N/A"}
            </p>
          </div>

          {/* 🔹 BTC Dominancia */}
          <div>
            <p className="text-sm text-gray-400">🔥 BTC Dominancia</p>
            <p className="text-lg font-semibold">
              {marketData.btc_dominance ? marketData.btc_dominance.toFixed(2) : "N/A"}%
            </p>
          </div>

          {/* 🔹 Likvidáció */}
          <div>
            <p className="text-sm text-gray-400">📉 Likvidáció</p>
            <p className={`text-lg font-semibold ${marketData.liquidation < 0 ? "text-red-400" : "text-green-400"}`}>
              {marketData.liquidation ? marketData.liquidation.toLocaleString() : "N/A"}
            </p>
          </div>

          {/* 🔹 Átlag RSI */}
          <div>
            <p className="text-sm text-gray-400">📊 Átlag RSI</p>
            <p className="text-lg font-semibold">
              {marketData.avg_rsi ? marketData.avg_rsi.toFixed(1) : "N/A"}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">⚠️ Adatok nem elérhetők</p>
      )}
    </div>
  );
}

export default MarketOverview;

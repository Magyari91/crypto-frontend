import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MarketOverview({ darkMode }) {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/global');
        if (response.data && response.data.data) {
          setMarketData(response.data.data);
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
    const intervalId = setInterval(fetchData, 60000); // 1 percenként frissítés

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <p>Adatok betöltése...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className={`p-4 rounded-2xl ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-xl mb-8`}>
      <h2 className="text-xl font-bold mb-4 text-center md:text-left">Piaci Összegzés</h2>
      {marketData ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-sm text-gray-400">🌍 Teljes Market Cap</p>
            <p className="text-lg font-semibold">
              ${marketData?.total_market_cap?.usd?.toLocaleString() || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">🔥 BTC Dominancia</p>
            <p className="text-lg font-semibold">
              {marketData?.market_cap_percentage?.btc?.toFixed(2) || "N/A"}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">📉 Likvidáció</p>
            <p className="text-lg font-semibold">
              {marketData?.market_cap_change_percentage_24h_usd?.toFixed(2) || "N/A"}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">📊 Átlag RSI</p>
            <p className="text-lg font-semibold">
              {marketData?.avg_rsi?.toFixed(1) || "N/A"}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">Adatok nem elérhetők</p>
      )}
    </div>
  );
}

export default MarketOverview;

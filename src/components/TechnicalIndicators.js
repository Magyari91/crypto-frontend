import React, { useEffect, useState } from "react";
import axios from "axios";

// Coin szimbólumok konvertálása CoinGecko formára
const coinMap = {
  BTC: "bitcoin",
  ETH: "ethereum",
  DOGE: "dogecoin",
};

function TechnicalIndicators({ coin, darkMode }) {
  const [indicators, setIndicators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndicators = async () => {
      setLoading(true);
      try {
        const coinName = coinMap[coin.toUpperCase()] || coin.toLowerCase();
        const response = await axios.get(
          `https://crypto-backend-pv99.onrender.com/crypto-indicators?coin=${coinName}`
        );

        if (!Array.isArray(response.data) || response.data.length === 0 || !response.data[0]) {
          throw new Error("Hibás vagy üres válasz az indikátor API-tól.");
        }

        setIndicators(response.data);
      } catch (err) {
        console.error("Technikai indikátor hiba:", err);
        setError("Technikai adatok nem elérhetők.");
      } finally {
        setLoading(false);
      }
    };

    fetchIndicators();
  }, [coin]);

  if (loading) return <p className="text-center text-gray-400">🔄 Indikátorok betöltése...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const i = indicators[0];
  const cardClass = `p-4 rounded-lg shadow ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 text-center">📍 {coin.toUpperCase()} Technikai Indikátorok</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className={cardClass}>
          <p className="text-sm text-gray-400">Ichimoku Bázis</p>
          <p className="text-xl font-bold text-blue-400">{i.ichimoku_base.toFixed(2)}</p>
        </div>
        <div className={cardClass}>
          <p className="text-sm text-gray-400">Ichimoku Konverzió</p>
          <p className="text-xl font-bold text-indigo-400">{i.ichimoku_conversion.toFixed(2)}</p>
        </div>
        <div className={cardClass}>
          <p className="text-sm text-gray-400">Fibonacci (EMA)</p>
          <p className="text-xl font-bold text-emerald-400">{i.ema.toFixed(2)}</p>
        </div>
        <div className={cardClass}>
          <p className="text-sm text-gray-400">RSI</p>
          <p className="text-xl font-bold text-yellow-400">{i.rsi.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default TechnicalIndicators;

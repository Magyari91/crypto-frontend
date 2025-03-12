import React, { useEffect, useState } from "react";
import axios from "axios";

function TechnicalIndicators({ coin, darkMode }) {
  const [indicators, setIndicators] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndicators = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://crypto-backend-pv99.onrender.com/crypto-indicators?coin=${coin}`
        );
        setIndicators(response.data);
      } catch (err) {
        setError("Nem sikerült lekérni az indikátorokat.");
      } finally {
        setLoading(false);
      }
    };
    fetchIndicators();
  }, [coin]);

  if (loading) return <p>🔄 Indikátorok betöltése...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className={`p-4 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <h2 className="text-xl font-bold mb-4">📊 Technikai Indikátorok ({coin.toUpperCase()})</h2>
      <p>📈 Ichimoku Bázis: {indicators[0].ichimoku_base.toFixed(2)}</p>
      <p>📉 Ichimoku Konverzió: {indicators[0].ichimoku_conversion.toFixed(2)}</p>
      <p>🌀 Fibonacci: {indicators[0].ema.toFixed(2)}</p>
      <p>📊 RSI: {indicators[0].rsi.toFixed(2)}</p>
    </div>
  );
}

export default TechnicalIndicators;

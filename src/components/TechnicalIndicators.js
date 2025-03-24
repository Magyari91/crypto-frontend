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

  if (loading) return <p className="text-center text-gray-400">🔄 Indikátorok betöltése...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const labelClasses = "text-sm text-gray-400";
  const valueClasses = "text-xl font-bold";

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 text-center">📍 {coin.toUpperCase()} Technikai Indikátorok</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          <p className={labelClasses}>Ichimoku Bázis</p>
          <p className={`${valueClasses} text-blue-400`}>{indicators[0].ichimoku_base.toFixed(2)}</p>
        </div>
        <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          <p className={labelClasses}>Ichimoku Konverzió</p>
          <p className={`${valueClasses} text-indigo-400`}>{indicators[0].ichimoku_conversion.toFixed(2)}</p>
        </div>
        <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          <p className={labelClasses}>Fibonacci (EMA)</p>
          <p className={`${valueClasses} text-emerald-400`}>{indicators[0].ema.toFixed(2)}</p>
        </div>
        <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          <p className={labelClasses}>RSI</p>
          <p className={`${valueClasses} text-yellow-400`}>{indicators[0].rsi.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default TechnicalIndicators;

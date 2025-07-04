import React, { useState, useEffect } from "react";
import axios from "axios";

const TechnicalIndicators = ({ coin = "bitcoin", days = 90, darkMode }) => {
  const [indicators, setIndicators] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(`/crypto-indicators?coin=${coin}&days=${days}`)
      .then((res) => {
        setIndicators(res.data);
      })
      .catch((err) => {
        console.error("Indikátorok betöltési hiba:", err);
        setError("Technikai adatok nem elérhetők.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [coin, days]);

  if (loading) {
    return (
      <div className={`p-4 rounded-lg shadow ${
        darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
      }`}>
        🔄 Indikátorok betöltése…
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 rounded-lg shadow ${
        darkMode ? "bg-gray-700 text-red-400" : "bg-gray-100 text-red-600"
      }`}>
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {indicators.map((ind, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-lg shadow ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <h3 className="font-semibold">{ind.name}</h3>
          <p>{ind.value}</p>
        </div>
      ))}
    </div>
  );
};

export default TechnicalIndicators;

// src/components/TopMovers.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://crypto-backend-pv99.onrender.com",
  timeout: 10000,
});

export default function TopMovers({ darkMode }) {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await API.get("/crypto-data", { cancelToken: source.token });
        if (!Array.isArray(res.data)) {
          throw new Error("Hibás API válasz (nem tömb).");
        }

        const valid = res.data.filter(
          (c) => typeof c.price_change_percentage_24h === "number"
        );
        if (valid.length === 0) {
          throw new Error("Nincsenek érvényes adatok.");
        }

        const sorted = valid.sort(
          (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
        );
        setTopGainers(sorted.slice(0, 5));
        setTopLosers(sorted.slice(-5).reverse());
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Adatlekérési hiba:", err);
          setError("Hiba történt az adatok lekérésekor.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60_000);

    return () => {
      clearInterval(intervalId);
      source.cancel("Component unmounted");
    };
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-400">
        🔄 Adatok betöltése…
      </p>
    );
  }
  if (error) {
    return (
      <p className="text-center text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className={`p-4 rounded-2xl shadow-xl mb-8 ${
      darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
    }`}>
      <h2 className="text-xl font-bold mb-4 text-center md:text-left">
        📈 Top Mozgók (24h)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Emelkedők */}
        <div>
          <h3 className="text-lg font-semibold mb-2">🚀 Top Emelkedők</h3>
          <ul>
            {topGainers.map((coin) => (
              <li
                key={coin.id}
                className="flex items-center py-2 border-b last:border-none"
              >
                <FaArrowUp className="text-green-500 mr-2" />
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-6 h-6 mr-2 rounded-full"
                />
                <span className="font-medium">
                  {coin.symbol.toUpperCase()}
                </span>
                <span className="ml-auto font-bold text-green-400">
                  +{coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Zuhanók */}
        <div>
          <h3 className="text-lg font-semibold mb-2">📉 Top Zuhanók</h3>
          <ul>
            {topLosers.map((coin) => (
              <li
                key={coin.id}
                className="flex items-center py-2 border-b last:border-none"
              >
                <FaArrowDown className="text-red-500 mr-2" />
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-6 h-6 mr-2 rounded-full"
                />
                <span className="font-medium">
                  {coin.symbol.toUpperCase()}
                </span>
                <span className="ml-auto font-bold text-red-400">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

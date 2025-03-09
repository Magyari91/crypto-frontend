import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function TopMovers({ darkMode }) {
  const [topGainers, setTopGainers] = useState();
  const [topLosers, setTopLosers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false');
        const sorted = response.data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        setTopGainers(sorted.slice(0, 5));
        setTopLosers(sorted.slice(-5).reverse());
      } catch (err) {
        console.error("Adatlekérési hiba:", err);
        setError("Hiba történt az adatok lekérésekor.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Adatok frissítése percenként

    return () => clearInterval(intervalId); // Interval törlése a komponens lebontásakor
  },);

  if (loading) {
    return <p>Adatok betöltése...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl mb-8`}>
      <h2 className="text-2xl font-bold mb-4">Top Mozgók (24h)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Top Emelkedők</h3>
          <ul>
            {topGainers.map(coin => (
              <li key={coin.id} className="flex items-center py-1">
                <FaArrowUp className="text-green-500 mr-2" />
                <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2 rounded-full" />
                <span>{coin.name} ({coin.price_change_percentage_24h.toFixed(2)}%)</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Top Zuhanók</h3>
          <ul>
            {topLosers.map(coin => (
              <li key={coin.id} className="flex items-center py-1">
                <FaArrowDown className="text-red-500 mr-2" />
                <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2 rounded-full" />
                <span>{coin.name} ({coin.price_change_percentage_24h.toFixed(2)}%)</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopMovers;
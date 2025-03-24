import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function CoinList({ darkMode }) {
  const [coinList, setCoinList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=true"
        );
        setCoinList(response.data);
      } catch (err) {
        console.error("Adatlekérési hiba:", err);
        setError("Hiba történt az adatok lekérésekor.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <p className="text-center text-gray-400">Adatok betöltése...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-center md:text-left">📈 Coin Lista</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coinList.map((coin) => {
          const isPositive = coin.price_change_percentage_24h >= 0;
          return (
            <div
              key={coin.id}
              className={`rounded-xl p-4 shadow-lg transition transform hover:scale-[1.02] ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              <div className="flex items-center mb-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                <h3 className="font-semibold text-lg">{coin.name} ({coin.symbol.toUpperCase()})</h3>
              </div>
              <p className="text-sm">
                Ár: <span className="font-bold text-blue-400">${coin.current_price.toLocaleString()}</span>
              </p>
              <p className="text-sm">
                24h változás:{" "}
                <span className={`font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </p>
              <div className="h-16 mt-2">
                {coin.sparkline_in_7d?.price.length > 0 && (
                  <Line
                    data={{
                      labels: coin.sparkline_in_7d.price.map((_, i) => i),
                      datasets: [
                        {
                          data: coin.sparkline_in_7d.price,
                          borderColor: isPositive ? "#22c55e" : "#ef4444",
                          borderWidth: 2,
                          pointRadius: 0,
                          fill: false,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: { display: false },
                        y: { display: false },
                      },
                      plugins: { legend: { display: false } },
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CoinList;

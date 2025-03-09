import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function MarketOverview({ darkMode }) {
  const [marketData, setMarketData] = useState(null);
  const [fearGreed, setFearGreed] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const marketResponse = await axios.get('https://api.coingecko.com/api/v3/global');
        const fearGreedResponse = await axios.get('https://api.alternative.me/fng/?limit=1');
        setMarketData(marketResponse.data.data);
        setFearGreed(fearGreedResponse.data.data[0]);

        const chartData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Piaci kapitalizáció',
              data: [
                marketResponse.data.data.total_market_cap.usd / 1000000000000, // Milliárd USD-ben
                // ... további adatok
              ],
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ],
        };
        setChartData(chartData);
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

  if (loading) return <p>Adatok betöltése...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!marketData || !fearGreed || !chartData) return null;

  return (
    <div className={`grid grid-cols-2 gap-6 p-6 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl mb-8`}>
      <div className="flex flex-col items-center">
        <img src="/moon-icon.svg" alt="Moon Icon" className="w-12 h-12 mb-2" />
        <p className="text-lg font-semibold">${(marketData.total_market_cap.usd / 1000000000).toFixed(2)}B</p>
        <p className="text-sm text-green-500">{marketData.market_cap_change_percentage_24h_usd.toFixed(2)}%</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-blue-500 w-16 h-16 flex items-center justify-center mb-2">
          <p className="text-white text-lg font-semibold">{fearGreed.value}</p>
        </div>
        <div className="rounded-full bg-green-500 w-16 h-16 flex items-center justify-center">
          <p className="text-white text-lg font-semibold">{marketData.market_cap_percentage.eth.toFixed(2)}%</p>
        </div>
      </div>
      <div className="col-span-2 mt-4">
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default MarketOverview;
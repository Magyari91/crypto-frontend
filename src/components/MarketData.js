import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MarketData({ darkMode }) {
  const [marketData, setMarketData] = useState(null);
  const [fearGreed, setFearGreed] = useState(null);
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
      } catch (err) {
        console.error("Adatlekérési hiba:", err);
        setError("Hiba történt az adatok lekérésekor.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Adatok betöltése...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!marketData || !fearGreed) {
    return null;
  }

  return (
    <div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl mb-8`}>
      <h2 className="text-2xl font-bold mb-4">Piaci adatok</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Teljes piaci kapitalizáció</h3>
          <p>${marketData.total_market_cap.usd.toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">24 órás teljes forgalom</h3>
          <p>${marketData.total_volume.usd.toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">BTC dominancia</h3>
          <p>{marketData.market_cap_percentage.btc.toFixed(2)}%</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">ETH dominancia</h3>
          <p>{marketData.market_cap_percentage.eth.toFixed(2)}%</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Fear & Greed Index</h3>
          <p>{fearGreed.value} ({fearGreed.value_classification})</p>
        </div>
      </div>
    </div>
  );
}

export default MarketData;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Heatmap({ darkMode }) {
  const [heatmapData, setHeatmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ellenőrizzük, hogy helyes API-t használunk
        const response = await axios.get('https://api.coingecko.com/api/v3/global');
        
        if (response.data && response.data.data) {
          setHeatmapData(response.data.data);
        } else {
          setError("Nem sikerült lekérni a hőtérképadatokat.");
        }
      } catch (err) {
        console.error("Hőtérkép API hiba:", err);
        setError("Hiba történt az adatok lekérésekor.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Frissítés 1 percenként

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <p>Adatok betöltése...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className={`p-6 rounded-xl shadow-xl ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} mt-6`}>
      <h2 className="text-xl font-bold mb-4">Kripto Hőtérkép</h2>
      {heatmapData ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-red-500 text-white rounded-lg">
            <p className="text-sm">BTC</p>
            <p className="text-lg font-bold">{heatmapData.market_cap_percentage.btc.toFixed(2)}%</p>
          </div>
          <div className="p-4 bg-green-500 text-white rounded-lg">
            <p className="text-sm">ETH</p>
            <p className="text-lg font-bold">{heatmapData.market_cap_percentage.eth.toFixed(2)}%</p>
          </div>
          <div className="p-4 bg-blue-500 text-white rounded-lg">
            <p className="text-sm">Altcoin Dominancia</p>
            <p className="text-lg font-bold">{(100 - heatmapData.market_cap_percentage.btc).toFixed(2)}%</p>
          </div>
          <div className="p-4 bg-yellow-500 text-white rounded-lg">
            <p className="text-sm">Piaci Kapitalizáció</p>
            <p className="text-lg font-bold">${heatmapData.total_market_cap.usd.toLocaleString()}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">Adatok nem elérhetők</p>
      )}
    </div>
  );
}

export default Heatmap;

import React, { useEffect, useState } from "react";
import axios from "axios";

function Heatmap() {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    axios.get("https://crypto-backend-pv99.onrender.com/heatmap")
      .then(response => setHeatmapData(response.data.heatmap))
      .catch(error => console.error("Hőtérkép betöltési hiba:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-800 rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Kripto Hőtérkép</h2>
      <div className="grid grid-cols-5 gap-2">
        {heatmapData.map((coin, index) => (
          <div key={index} className={`p-4 rounded-lg ${coin.price_change > 0 ? "bg-green-500" : "bg-red-500"}`}>
            <p className="font-bold">{coin.symbol.toUpperCase()}</p>
            <p>{coin.price_change.toFixed(2)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Heatmap;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; // Importáld a Line komponenst

function CoinList({ darkMode }) {
  const [coinList, setCoinList] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        setCoinList(response.data);
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
    <div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl mb-8`}> {/* Adj hozzá egy div-et a táblázat köré */}
      <h2 className="text-2xl font-bold mb-4">Coin Lista</h2> {/* Adj hozzá egy címet */}
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Coin</th>
            <th className="text-left">Ár</th>
            <th className="text-left">24h</th>
            <th className="text-left">Market Cap</th>
            <th className="text-left">Volume</th>
            {/* Eltávolítottuk a Graph oszlopot */}
          </tr>
        </thead>
        <tbody>
          {coinList.map(coin => (
            <tr key={coin.id} className="border-b">
              <td className="flex items-center py-2"> {/* Növeltük a cella padding-jét */}
                <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-2 rounded-full" /> {/* Lekerekítettük a képet */}
                <span>{coin.name}</span>
              </td>
              <td className="py-2">${coin.current_price.toFixed(2)}</td> {/* Növeltük a cella padding-jét */}
              <td className={`${coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"} py-2`}> {/* Növeltük a cella padding-jét */}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="py-2">${coin.market_cap.toLocaleString()}</td> {/* Növeltük a cella padding-jét */}
              <td className="py-2">${coin.total_volume.toLocaleString()}</td> {/* Növeltük a cella padding-jét */}
              {/* Eltávolítottuk a Graph cellát */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoinList;
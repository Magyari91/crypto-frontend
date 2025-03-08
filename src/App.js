import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function App() {
  const [cryptoData, setCryptoData] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("https://crypto-backend-pv99.onrender.com/crypto")
      .then((response) => response.json())
      .then((data) => {
        setCryptoData(data);
        setChartData([
          { name: "BTC", price: data.btc_price },
          { name: "ETH", price: data.eth_price },
          { name: "DOGE", price: data.doge_price },
        ]);
      })
      .catch((error) => console.error("Hiba az API lekérdezésekor:", error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Kriptovaluta Piac</h1>
        {cryptoData ? (
          <div>
            <p className="text-lg">🪙 <strong>Bitcoin (BTC):</strong> ${cryptoData.btc_price}</p>
            <p className="text-lg">🪙 <strong>Ethereum (ETH):</strong> ${cryptoData.eth_price}</p>
            <p className="text-lg">🪙 <strong>Dogecoin (DOGE):</strong> ${cryptoData.doge_price}</p>
            <p className="text-lg mt-4">🌎 <strong>Teljes Piaci Kapitalizáció:</strong> ${cryptoData.market_cap_total}</p>

            <h2 className="text-xl font-bold mt-6 text-center">Árfolyamváltozás</h2>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#00c6ff" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">Adatok betöltése...</p>
        )}
      </div>
    </div>
  );
}

export default App;

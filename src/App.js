import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function App() {
  const [cryptoData, setCryptoData] = useState(null);
  const [btcChartData, setBtcChartData] = useState([]);
  const [ethChartData, setEthChartData] = useState([]);
  const [dogeChartData, setDogeChartData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://crypto-backend-pv99.onrender.com/crypto")
        .then((response) => response.json())
        .then((data) => {
          setCryptoData(data);

          // Grafikon adatok frissítése
          setBtcChartData((prev) => [...prev.slice(-10), { time: new Date().toLocaleTimeString(), price: data.btc_price }]);
          setEthChartData((prev) => [...prev.slice(-10), { time: new Date().toLocaleTimeString(), price: data.eth_price }]);
          setDogeChartData((prev) => [...prev.slice(-10), { time: new Date().toLocaleTimeString(), price: data.doge_price }]);
        })
        .catch((error) => console.error("Hiba az API lekérdezésekor:", error));
    };

    fetchData();
    const interval = setInterval(fetchData, 600000); // 10 percenként frissítés

    return () => clearInterval(interval);
  }, []);

  // Kapitalizáció átalakítása trillió dollár formátumba
  const formatMarketCap = (marketCap) => {
    return marketCap ? `$${(marketCap / 1e12).toFixed(2)}T USD` : "N/A";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 py-8">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-green-400">💰 Kriptovaluta Piac</h1>
        {cryptoData ? (
          <div className="space-y-2">
            <p className="text-lg">🟡 <strong>Bitcoin (BTC):</strong> ${cryptoData.btc_price.toLocaleString()} USD</p>
            <p className="text-lg">🔷 <strong>Ethereum (ETH):</strong> ${cryptoData.eth_price.toLocaleString()} USD</p>
            <p className="text-lg">🐶 <strong>Dogecoin (DOGE):</strong> ${cryptoData.doge_price.toLocaleString()} USD</p>
            <p className="text-lg mt-4">
              🌍 <strong>Teljes Piaci Kapitalizáció:</strong> {formatMarketCap(cryptoData.market_cap_total)}
            </p>

            {/* Bitcoin árfolyam */}
            <h2 className="text-xl font-bold mt-6 text-center">📈 Bitcoin Árfolyam</h2>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={btcChartData}>
                  <XAxis dataKey="time" stroke="#ddd" />
                  <YAxis stroke="#ddd" domain={['auto', 'auto']} />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#f2a900" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Ethereum árfolyam */}
            <h2 className="text-xl font-bold mt-6 text-center">📈 Ethereum Árfolyam</h2>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={ethChartData}>
                  <XAxis dataKey="time" stroke="#ddd" />
                  <YAxis stroke="#ddd" domain={['auto', 'auto']} />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#3c3c3d" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Dogecoin árfolyam */}
            <h2 className="text-xl font-bold mt-6 text-center">📈 Dogecoin Árfolyam</h2>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dogeChartData}>
                  <XAxis dataKey="time" stroke="#ddd" />
                  <YAxis stroke="#ddd" domain={['auto', 'auto']} />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#c2a633" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 animate-pulse">🔄 Adatok betöltése...</p>
        )}
      </div>
    </div>
  );
}

export default App;

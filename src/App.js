import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function App() {
  const [selectedRange, setSelectedRange] = useState(30);
  const [cryptoData, setCryptoData] = useState(null);
  const [btcHistory, setBtcHistory] = useState([]);
  const [ethHistory, setEthHistory] = useState([]);
  const [dogeHistory, setDogeHistory] = useState([]);
  const [indicators, setIndicators] = useState(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Árfolyam adatok lekérése Bitcoinhoz
    fetch(`https://crypto-backend-pv99.onrender.com/crypto-history?coin=bitcoin&days=${selectedRange}`)
      .then((res) => res.json())
      .then((data) => setBtcHistory(data.history))
      .catch((err) => console.error("Hiba az árfolyam lekérésénél (BTC):", err));

    // Árfolyam adatok lekérése Ethereumhoz
    fetch(`https://crypto-backend-pv99.onrender.com/crypto-history?coin=ethereum&days=${selectedRange}`)
      .then((res) => res.json())
      .then((data) => setEthHistory(data.history))
      .catch((err) => console.error("Hiba az árfolyam lekérésénél (ETH):", err));

    // Árfolyam adatok lekérése Dogecoinhoz
    fetch(`https://crypto-backend-pv99.onrender.com/crypto-history?coin=dogecoin&days=${selectedRange}`)
      .then((res) => res.json())
      .then((data) => setDogeHistory(data.history))
      .catch((err) => console.error("Hiba az árfolyam lekérésénél (DOGE):", err));

    // Indikátorok lekérése Bitcoinhoz
    fetch(`https://crypto-backend-pv99.onrender.com/crypto-indicators?coin=bitcoin&days=${selectedRange}`)
      .then((res) => res.json())
      .then((data) => setIndicators(data))
      .catch((err) => console.error("Hiba az indikátorok lekérésénél:", err));
  }, [selectedRange]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} px-6 py-8`}>
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-green-400">💰 Kriptovaluta Piac</h1>

        <div className="flex justify-between items-center mb-4">
          <select onChange={(e) => setSelectedRange(e.target.value)} className="bg-gray-700 text-white p-2 rounded">
            <option value="7">1 hét</option>
            <option value="30">1 hónap</option>
            <option value="365">1 év</option>
            <option value="1825">5 év</option>
          </select>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {theme === "dark" ? "🌞 Világos mód" : "🌙 Sötét mód"}
          </button>
        </div>

        {/* Bitcoin árfolyam */}
        <h2 className="text-xl font-bold mt-6 text-center">📈 Bitcoin Árfolyam – {selectedRange} nap</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={btcHistory}>
            <XAxis dataKey="date" stroke="#ddd" />
            <YAxis stroke="#ddd" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#f2a900" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>

        {/* Ethereum árfolyam */}
        <h2 className="text-xl font-bold mt-6 text-center">📈 Ethereum Árfolyam – {selectedRange} nap</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={ethHistory}>
            <XAxis dataKey="date" stroke="#ddd" />
            <YAxis stroke="#ddd" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#3c3c3d" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>

        {/* Dogecoin árfolyam */}
        <h2 className="text-xl font-bold mt-6 text-center">📈 Dogecoin Árfolyam – {selectedRange} nap</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dogeHistory}>
            <XAxis dataKey="date" stroke="#ddd" />
            <YAxis stroke="#ddd" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#c2a633" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>

        {/* RSI indikátor */}
        {indicators && (
          <div>
            <h2 className="text-xl font-bold mt-6 text-center">📊 RSI Indikátor</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={indicators}>
                <XAxis dataKey="date" stroke="#ddd" />
                <YAxis stroke="#ddd" domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="rsi" stroke="#ff5722" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from "recharts";

function App() {
  const [selectedRange, setSelectedRange] = useState(30);
  const [theme, setTheme] = useState("dark");
  const [cryptoData, setCryptoData] = useState({
    bitcoin: { history: [], indicators: {} },
    ethereum: { history: [], indicators: {} },
    dogecoin: { history: [], indicators: {} }
  });

  const fetchCryptoData = async (coin) => {
    try {
      const historyRes = await fetch(`https://crypto-backend-pv99.onrender.com/crypto-history?coin=${coin}&days=${selectedRange}`);
      const historyData = await historyRes.json();

      const indicatorsRes = await fetch(`https://crypto-backend-pv99.onrender.com/crypto-indicators?coin=${coin}&days=${selectedRange}`);
      const indicatorsData = await indicatorsRes.json();

      const formattedHistory = historyData.history.map(item => ({
        date: new Date(item.timestamp * 1000).toLocaleDateString(),
        price: item.price,
        upper_band: indicatorsData.bollinger.upper[item.timestamp],
        lower_band: indicatorsData.bollinger.lower[item.timestamp],
        ema: indicatorsData.ema[item.timestamp],
        rsi: indicatorsData.rsi[item.timestamp]
      }));

      setCryptoData(prevState => ({
        ...prevState,
        [coin]: { history: formattedHistory, indicators: indicatorsData }
      }));
    } catch (error) {
      console.error(`Hiba az adatok lekérésénél (${coin}):`, error);
    }
  };

  useEffect(() => {
    fetchCryptoData("bitcoin");
    fetchCryptoData("ethereum");
    fetchCryptoData("dogecoin");
  }, [selectedRange]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} px-6 py-8`}>
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-yellow-400">🪙 Kriptovaluta Piac</h1>

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

        {/* Bitcoin Árfolyam + Bollinger Bands + EMA */}
        <h2 className="text-xl font-bold mt-6 text-center">📈 Bitcoin Árfolyam – {selectedRange} nap</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={cryptoData.bitcoin.history}>
            <XAxis dataKey="date" stroke="#ddd" tick={{ fontSize: 12 }} />
            <YAxis stroke="#ddd" />
            <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
            <Area type="monotone" dataKey="upper_band" stroke="gray" fill="rgba(255,255,255,0.2)" />
            <Area type="monotone" dataKey="lower_band" stroke="gray" fill="rgba(255,255,255,0.2)" />
            <Line type="monotone" dataKey="price" stroke="#f2a900" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="ema" stroke="#ff5722" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>

        {/* RSI Indikátor Bitcoinhoz */}
        <h2 className="text-lg font-bold mt-6 text-center">📊 Bitcoin RSI</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={cryptoData.bitcoin.history}>
            <XAxis dataKey="date" stroke="#ddd" tick={{ fontSize: 12 }} />
            <YAxis stroke="#ddd" domain={[0, 100]} />
            <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
            <Line type="monotone" dataKey="rsi" stroke="#ff5722" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;

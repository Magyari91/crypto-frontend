import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from "recharts";

function App() {
<<<<<<< HEAD
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
=======
  const [cryptoData, setCryptoData] = useState(null);
  const [chartData, setChartData] = useState({ btc: [], eth: [], doge: [] });
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [days, setDays] = useState(365);
  const [indicators, setIndicators] = useState({ rsi: [], ema: [], bollinger: { upper: [], lower: [] } });

  useEffect(() => {
    fetch("https://crypto-backend-pv99.onrender.com/crypto")
      .then((response) => response.json())
      .then((data) => {
        setCryptoData(data);
      })
      .catch((error) => console.error("Hiba az API lekérdezésekor:", error));
  }, []);

  useEffect(() => {
    fetch(`https://crypto-backend-pv99.onrender.com/crypto-history?coin=${selectedCoin}&days=${days}`)
      .then((response) => response.json())
      .then((data) => {
        setChartData((prev) => ({ ...prev, [selectedCoin]: data.history }));
      })
      .catch((error) => console.error(`Hiba az adatok lekérésénél (${selectedCoin}):`, error));
  }, [selectedCoin, days]);

  useEffect(() => {
    fetch(`https://crypto-backend-pv99.onrender.com/crypto-indicators?coin=${selectedCoin}&days=${days}`)
      .then((response) => response.json())
      .then((data) => {
        setIndicators({
          rsi: data.map((d, i) => ({ date: i, value: d.rsi })),
          ema: data.map((d, i) => ({ date: i, value: d.ema })),
          bollinger: {
            upper: data.map((d, i) => ({ date: i, value: d.bollinger_upper })),
            lower: data.map((d, i) => ({ date: i, value: d.bollinger_lower })),
          },
        });
      })
      .catch((error) => console.error(`Hiba az indikátorok lekérésénél (${selectedCoin}):`, error));
  }, [selectedCoin, days]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">💰 Kriptovaluta Piac</h1>
        <select className="bg-gray-700 text-white p-2 rounded mb-4" value={days} onChange={(e) => setDays(e.target.value)}>
          <option value="7">7 nap</option>
          <option value="30">30 nap</option>
          <option value="365">1 év</option>
          <option value="1825">5 év</option>
        </select>
        {cryptoData ? (
          <div>
            <p className="text-lg">🪙 <strong>Bitcoin (BTC):</strong> ${cryptoData.btc_price.toFixed(2)} USD</p>
            <p className="text-lg">🪙 <strong>Ethereum (ETH):</strong> ${cryptoData.eth_price.toFixed(2)} USD</p>
            <p className="text-lg">🪙 <strong>Dogecoin (DOGE):</strong> ${cryptoData.doge_price.toFixed(4)} USD</p>
            <p className="text-lg mt-4">🌎 <strong>Piaci Kapitalizáció:</strong> ${cryptoData.market_cap_total.toFixed(2)} USD</p>
          </div>
        ) : (
          <p className="text-center text-gray-400">Adatok betöltése...</p>
        )}
        
        <h2 className="text-xl font-bold mt-6 text-center">{selectedCoin.toUpperCase()} Árfolyam {days} nap alatt</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData[selectedCoin]}>
            <XAxis dataKey="date" stroke="#fff" hide />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#00c6ff" strokeWidth={3} />
            <Line type="monotone" dataKey="value" data={indicators.ema} stroke="#ffcc00" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="value" data={indicators.bollinger.upper} stroke="#ff0000" strokeWidth={1} dot={false} />
            <Line type="monotone" dataKey="value" data={indicators.bollinger.lower} stroke="#00ff00" strokeWidth={1} dot={false} />
          </LineChart>
        </ResponsiveContainer>
>>>>>>> d8a423e (ETH és DOGE grafikonok visszaállítva)

        <div className="flex justify-center mt-4">
          <button className={`px-4 py-2 rounded ${selectedCoin === "bitcoin" ? "bg-blue-500" : "bg-gray-600"}`} onClick={() => setSelectedCoin("bitcoin")}>
            Bitcoin
          </button>
          <button className={`px-4 py-2 mx-2 rounded ${selectedCoin === "ethereum" ? "bg-blue-500" : "bg-gray-600"}`} onClick={() => setSelectedCoin("ethereum")}>
            Ethereum
          </button>
          <button className={`px-4 py-2 rounded ${selectedCoin === "dogecoin" ? "bg-blue-500" : "bg-gray-600"}`} onClick={() => setSelectedCoin("dogecoin")}>
            Dogecoin
          </button>
        </div>
<<<<<<< HEAD

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
=======
>>>>>>> d8a423e (ETH és DOGE grafikonok visszaállítva)
      </div>
    </div>
  );
}

export default App;

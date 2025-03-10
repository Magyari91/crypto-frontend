import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart, Line, LinearScale } from 'chart.js'; // Importálás

Chart.register(LinearScale); // Regisztrálás

function CoinList({ darkMode }) {
    const [coinList, setCoinList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true');
                setCoinList(response.data);
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

    return (
        <div className={`p-4 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl mb-8`}>
            <h2 className="text-xl font-bold mb-4 text-center md:text-left">Coin Lista</h2>
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left">
                        <th className="py-2 px-3">Coin</th>
                        <th className="py-2 px-3">Ár</th>
                        <th className="py-2 px-3">24h</th>
                        <th className="py-2 px-3">Market Cap</th>
                        <th className="py-2 px-3">Volume</th>
                        <th className="py-2 px-3">Graph</th>
                    </tr>
                </thead>
                <tbody>
                    {coinList.map(coin => (
                        <tr key={coin.id} className="border-b">
                            <td className="py-2 px-3 flex items-center">
                                <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2 rounded-full" />
                                <span>{coin.symbol.toUpperCase()}</span>
                            </td>
                            <td className="py-2 px-3">${coin.current_price.toLocaleString()}</td>
                            <td className={`py-2 px-3 ${coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </td>
                            <td className="py-2 px-3">${coin.market_cap.toLocaleString()}</td>
                            <td className="py-2 px-3">${coin.total_volume.toLocaleString()}</td>
                            <td className="py-2 px-3">
                                {coin.sparkline_in_7d && coin.sparkline_in_7d.price.length > 0 && (
                                    <Line
                                        data={{
                                            labels: coin.sparkline_in_7d.price.map((_, index) => index),
                                            datasets: [{
                                                data: coin.sparkline_in_7d.price,
                                                borderColor: coin.price_change_percentage_24h > 0 ? "green" : "red",
                                                borderWidth: 1,
                                                pointRadius: 0,
                                                fill: false,
                                            }],
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            scales: {
                                                x: { type: 'linear', display: false },
                                                y: { display: false },
                                            },
                                            plugins: { legend: { display: false } },
                                        }}
                                        height={40}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CoinList;
import React, { useState, useEffect } from "react";
import axios from "axios";

function CryptoNews({ darkMode }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("https://min-api.cryptocompare.com/data/v2/news/?lang=EN")
      .then((response) => setNews(response.data.Data.slice(0, 5))) // Csak 5 hír jelenjen meg
      .catch((error) => console.error("Hiba a hírek lekérésekor:", error));
  }, []);

  return (
    <div className={`p-4 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl mb-8`}>
      <h2 className="text-xl font-bold mb-4">Kripto Hírek</h2>
      <ul>
        {news.map((article, index) => (
          <li key={index} className="mb-2">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CryptoNews;

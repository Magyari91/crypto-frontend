import React, { useEffect, useState } from "react";
import axios from "axios";

function NewsSection({ darkMode }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("https://crypto-backend-pv99.onrender.com/crypto-news")
      .then((response) => setNews(response.data.slice(0, 6)))
      .catch((error) => console.error("Hírek betöltési hiba:", error));
  }, []);

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-center md:text-left">📰 Kripto Hírek</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-md p-4 transition hover:shadow-lg ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h3 className="font-semibold text-md mb-2">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-400">
                {item.title}
              </a>
            </h3>
            {item.source && (
              <p className="text-sm text-gray-400 mt-2">Forrás: {item.source}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsSection;

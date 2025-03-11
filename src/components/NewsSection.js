import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NewsSection({ darkMode }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("https://crypto-backend-pv99.onrender.com/crypto-news")
      .then(response => setNews(response.data.slice(0, 5)))
      .catch(error => console.error("Hírek betöltési hiba:", error));
  }, []);

  return (
    <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
      <h2 className="text-xl font-bold mb-4">📰 Kripto Hírek</h2>
      <ul>
        {news.map((item, index) => (
          <li key={index} className="mb-2">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsSection;

// CryptoCard.js
import React from 'react';

export function CryptoCard({ coin, data, darkMode }) {
  if (!data) {
    return (
      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-white"} shadow-md transition-all duration-300`}>
        <h3 className="text-lg font-semibold mb-2 text-center">{coin}</h3>
        <p className="text-sm text-center">Adatok betöltése...</p>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-white"} shadow-md transition-all duration-300`}>
      <h3 className="text-lg font-semibold mb-2 text-center">{coin}</h3>
      <p className="text-sm text-center">Ár: ${data.price.toFixed(2)}</p>
      <p className="text-sm text-center">Változás 24 óra: {data.change24h.toFixed(2)}%</p>
    </div>
  );
}
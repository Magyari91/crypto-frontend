import React from 'react';

const CryptoCard = ({ coin, data, darkMode }) => {
  const formattedData = typeof data === 'number' ? data.toFixed(2) : data; // Ellenőrzi, hogy a data szám-e, és formázza

  return (
    <div className="text-center p-6 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-colors duration-200">
      <p className="text-xl font-semibold mb-2">{coin}</p>
      <p className="text-3xl font-bold text-blue-400">
        ${formattedData}
      </p>
      <span className="text-sm text-gray-400">{coin}/USD</span>
    </div>
  );
};

export default CryptoCard;
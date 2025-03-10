// CryptoCard.js
import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export function CryptoCard({ coin, data, darkMode }) {
  if (!data || typeof data.price === "undefined" || typeof data.change24h === "undefined") {
    return (
      <div
        className={`p-4 rounded-xl ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"} shadow-md transition-all duration-300 text-center`}
      >
        <h3 className="text-lg font-semibold mb-2">{coin}</h3>
        <p className="text-sm">Adatok betöltése...</p>
      </div>
    );
  }

  const isPositive = data.change24h >= 0;

  return (
    <div
      className={`p-4 rounded-xl ${
        darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
      } shadow-md transition-all duration-300 text-center`}
    >
      <h3 className="text-lg font-semibold mb-2">{coin}</h3>
      <p className="text-sm font-bold">
        Ár: <span className="text-blue-400">${data.price.toFixed(2)}</span>
      </p>
      <p className="text-sm flex justify-center items-center">
        Változás 24h:{" "}
        <span className={`ml-2 font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {isPositive ? <FaArrowUp className="inline-block mr-1" /> : <FaArrowDown className="inline-block mr-1" />}
          {data.change24h.toFixed(2)}%
        </span>
      </p>
    </div>
  );
}

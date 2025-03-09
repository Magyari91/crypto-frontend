import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CoinList({ darkMode }) {
  // ...
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left">Coin</th>
          <th className="text-left">Ár</th>
          <th className="text-left">24h</th>
          <th className="text-left">Market Cap</th>
          <th className="text-left">Volume</th>
        </tr>
      </thead>
      <tbody>
        {coinList.map(coin => (
          <tr key={coin.id} className="border-b">
            <td className="flex items-center">
              <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-2" />
              <span>{coin.name}</span>
            </td>
            <td>${coin.current_price.toFixed(2)}</td>
            <td className={coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </td>
            <td>${coin.market_cap.toLocaleString()}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CoinList;
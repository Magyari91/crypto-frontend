import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function CoinList({ darkMode }) {
  // ... (a többi kód ugyanaz marad)

  return (
    <div className={`p-4 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl mb-8`}>
      {/* ... (a többi kód ugyanaz marad) */}
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
                x: { 
                  type: 'linear', // Módosítás: 'category' helyett 'linear' 
                  display: false 
                },
                y: { display: false },
              },
              plugins: { legend: { display: false } },
            }}
            height={40}
          />
        )}
      </td>
      {/* ... (a többi kód ugyanaz marad) */}
    </div>
  );
}

export default CoinList;
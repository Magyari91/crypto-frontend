import React from "react";

function MarketOverview({ data }) {
  return (
    <div className="p-6 rounded-lg bg-gray-800 shadow-lg">
      <h2 className="text-xl font-bold">Piaci Áttekintés</h2>
      <p>Total Market Cap: ${data.total_market_cap.toFixed(2)}B</p>
      <p>BTC Dominancia: {data.btc_dominance.toFixed(2)}%</p>
      <p>ETH Dominancia: {data.eth_dominance.toFixed(2)}%</p>
    </div>
  );
}

export default MarketOverview;

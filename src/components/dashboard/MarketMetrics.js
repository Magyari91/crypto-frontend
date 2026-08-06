import React from "react";
import { FiActivity, FiDollarSign, FiPieChart, FiZap } from "react-icons/fi";
import { formatCompactCurrency, formatPercent } from "../../utils/formatters";

const sentimentLabels = {
  "Extreme Fear": "Extrém félelem",
  Fear: "Félelem",
  Neutral: "Semleges",
  Greed: "Kapzsiság",
  "Extreme Greed": "Extrém kapzsiság",
};

function MarketMetrics({ market }) {
  const fearGreed = market.fear_greed || {};
  const metrics = [
    {
      label: "Teljes piaci érték",
      value: formatCompactCurrency(market.total_market_cap),
      icon: FiDollarSign,
    },
    {
      label: "24 órás forgalom",
      value: formatCompactCurrency(market.total_volume_24h),
      icon: FiActivity,
    },
    {
      label: "BTC dominancia",
      value: formatPercent(market.btc_dominance),
      icon: FiPieChart,
    },
    {
      label: "Fear & Greed",
      value: fearGreed.value ?? "-",
      detail: sentimentLabels[fearGreed.label] || fearGreed.label || "Nincs adat",
      icon: FiZap,
    },
  ];

  return (
    <section className="metric-strip" aria-label="Piaci összegzés">
      {metrics.map(({ label, value, detail, icon: Icon }) => (
        <div className="metric-item" key={label}>
          <Icon aria-hidden="true" />
          <span>
            <small>{label}</small>
            <strong>{value}</strong>
            {detail && <em>{detail}</em>}
          </span>
        </div>
      ))}
    </section>
  );
}

export default MarketMetrics;

import React from "react";
import { FiActivity, FiDollarSign, FiPieChart, FiZap } from "react-icons/fi";
import { formatCompactCurrency, formatPercent } from "../../utils/formatters";
import { useLanguage } from "../../i18n/LanguageContext";

function MarketMetrics({ market }) {
  const { copy } = useLanguage();
  const fearGreed = market.fear_greed || {};
  const overviewAvailable = market.overview_available !== false;
  const metrics = [
    {
      label: copy.marketMetrics.marketCap,
      value: overviewAvailable ? formatCompactCurrency(market.total_market_cap) : "-",
      icon: FiDollarSign,
    },
    {
      label: copy.marketMetrics.volume24h,
      value: overviewAvailable ? formatCompactCurrency(market.total_volume_24h) : "-",
      icon: FiActivity,
    },
    {
      label: copy.marketMetrics.btcDominance,
      value: overviewAvailable ? formatPercent(market.btc_dominance) : "-",
      icon: FiPieChart,
    },
    {
      label: "Fear & Greed",
      value: fearGreed.value ?? "-",
      detail:
        copy.marketMetrics.sentiment[fearGreed.label] ||
        fearGreed.label ||
        copy.marketMetrics.noData,
      icon: FiZap,
    },
  ];

  return (
    <section className="metric-strip" aria-label={copy.marketMetrics.summary}>
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

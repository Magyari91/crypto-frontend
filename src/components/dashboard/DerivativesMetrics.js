import React from "react";
import { FiActivity, FiBarChart2, FiRepeat, FiUsers } from "react-icons/fi";
import { formatCompactCurrency, formatPercent } from "../../utils/formatters";

function ratio(value) {
  if (value == null || value === "") return "-";
  const number = Number(value);
  return Number.isFinite(number) ? `${number.toFixed(2).replace(".", ",")}×` : "-";
}

function formatFundingPercent(value) {
  const number = Number(value);
  return Number.isFinite(number) ? `${number.toFixed(4).replace(".", ",")}%` : "-";
}

function DerivativesMetrics({ data }) {
  const available = Boolean(data?.available);
  const metrics = [
    {
      label: "Funding rate",
      value: available ? formatFundingPercent(data.funding_rate_pct) : "-",
      detail:
        data?.funding_7d_avg_pct == null
          ? "Nincs 7 napos átlag"
          : `7 napos átlag: ${formatFundingPercent(data.funding_7d_avg_pct)}`,
      icon: FiRepeat,
    },
    {
      label: "Nyitott kötésállomány",
      value: data?.open_interest_usd == null ? "-" : formatCompactCurrency(data.open_interest_usd),
      detail:
        data?.open_interest_change_7d_pct == null
          ? "30 napos publikus ablak"
          : `7 nap: ${formatPercent(data.open_interest_change_7d_pct, true)}`,
      icon: FiBarChart2,
    },
    {
      label: "Long / short számlák",
      value: ratio(data?.long_short_ratio),
      detail:
        data?.long_account_pct == null
          ? "Nincs friss arány"
          : `Long arány: ${formatPercent(data.long_account_pct)}`,
      icon: FiUsers,
    },
    {
      label: "Taker vétel / eladás",
      value: ratio(data?.taker_buy_sell_ratio),
      detail:
        data?.taker_buy_share_pct == null
          ? "Nincs friss order-flow adat"
          : `Vételi rész: ${formatPercent(data.taker_buy_share_pct)}`,
      icon: FiActivity,
    },
  ];

  return (
    <section className={`surface derivatives-panel ${available ? "" : "unavailable"}`} aria-labelledby="derivatives-title">
      <header className="panel-heading">
        <div>
          <span className="eyebrow">Binance USDⓈ-M futures</span>
          <h2 id="derivatives-title">Származtatott piaci kontextus</h2>
        </div>
        <small>{available ? `${data.funding_history_days || 0} nap funding-előzmény` : "Átmenetileg nincs adat"}</small>
      </header>
      <div className="derivatives-metrics">
        {metrics.map(({ label, value, detail, icon: Icon }) => (
          <div className="derivative-metric" key={label}>
            <Icon aria-hidden="true" />
            <span>
              <small>{label}</small>
              <strong>{value}</strong>
              <em>{detail}</em>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DerivativesMetrics;

import React from "react";
import { FiActivity, FiBarChart2, FiRepeat, FiUsers } from "react-icons/fi";
import { formatCompactCurrency, formatPercent } from "../../utils/formatters";
import { useLanguage } from "../../i18n/LanguageContext";

function ratio(value, locale) {
  if (value == null || value === "") return "-";
  const number = Number(value);
  return Number.isFinite(number)
    ? `${new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)}×`
    : "-";
}

function formatFundingPercent(value, locale) {
  const number = Number(value);
  return Number.isFinite(number)
    ? `${new Intl.NumberFormat(locale, { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(number)}%`
    : "-";
}

function DerivativesMetrics({ data }) {
  const { copy, locale } = useLanguage();
  const available = Boolean(data?.available);
  const metrics = [
    {
      label: copy.derivatives.fundingRate,
      value: available ? formatFundingPercent(data.funding_rate_pct, locale) : "-",
      detail:
        data?.funding_7d_avg_pct == null
          ? copy.derivatives.no7dAverage
          : `${copy.derivatives.average7d}: ${formatFundingPercent(data.funding_7d_avg_pct, locale)}`,
      icon: FiRepeat,
    },
    {
      label: copy.derivatives.openInterest,
      value: data?.open_interest_usd == null ? "-" : formatCompactCurrency(data.open_interest_usd),
      detail:
        data?.open_interest_change_7d_pct == null
          ? copy.derivatives.publicWindow30d
          : `${copy.derivatives.days7}: ${formatPercent(data.open_interest_change_7d_pct, true)}`,
      icon: FiBarChart2,
    },
    {
      label: copy.derivatives.longShort,
      value: ratio(data?.long_short_ratio, locale),
      detail:
        data?.long_account_pct == null
          ? copy.derivatives.noRatio
          : `${copy.derivatives.longShare}: ${formatPercent(data.long_account_pct)}`,
      icon: FiUsers,
    },
    {
      label: copy.derivatives.taker,
      value: ratio(data?.taker_buy_sell_ratio, locale),
      detail:
        data?.taker_buy_share_pct == null
          ? copy.derivatives.noOrderFlow
          : `${copy.derivatives.buyShare}: ${formatPercent(data.taker_buy_share_pct)}`,
      icon: FiActivity,
    },
  ];

  return (
    <section className={`surface derivatives-panel ${available ? "" : "unavailable"}`} aria-labelledby="derivatives-title">
      <header className="panel-heading">
        <div>
          <span className="eyebrow">Binance USDⓈ-M futures</span>
          <h2 id="derivatives-title">{copy.derivatives.title}</h2>
        </div>
        <small>{available ? copy.derivatives.fundingHistory(data.funding_history_days || 0) : copy.derivatives.unavailable}</small>
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

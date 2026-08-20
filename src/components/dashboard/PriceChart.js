import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatPrice } from "../../utils/formatters";
import { useLanguage } from "../../i18n/LanguageContext";

function chartDate(value, locale) {
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(
    new Date(value)
  );
}

function ChartTooltip({ active, payload, locale }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <span>{chartDate(point.timestamp, locale)}</span>
      <strong>{formatPrice(point.price)}</strong>
    </div>
  );
}

function PriceChart({ selected }) {
  const { copy, locale } = useLanguage();
  const forecast = selected.forecast;
  const series = forecast.series || [];

  return (
    <section className="surface chart-panel" aria-labelledby="chart-title">
      <header className="panel-heading">
        <div>
          <span>{copy.chart.eyebrow}</span>
          <h2 id="chart-title">{copy.chart.title(selected.symbol)}</h2>
        </div>
        <div className="chart-legend">
          <span><i className="actual-line" />{copy.chart.actual}</span>
          <span><i className="target-line" />{copy.chart.target}</span>
        </div>
      </header>

      <div className="chart-area" aria-label={copy.chart.aria(selected.name)}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 12, right: 8, left: 4, bottom: 0 }}>
            <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) => chartDate(value, locale)}
              minTickGap={34}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={["auto", "auto"]}
              tickFormatter={(value) => formatPrice(value)}
              width={78}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTooltip locale={locale} />} cursor={{ stroke: "var(--chart-cursor)" }} />
            <ReferenceLine
              y={forecast.target_price}
              stroke="var(--warning)"
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="var(--accent)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: "var(--accent)" }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default PriceChart;

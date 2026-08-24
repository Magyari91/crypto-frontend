import React from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatPercent, formatPrice } from "../../utils/formatters";
import { useLanguage } from "../../i18n/LanguageContext";

const DAY_MS = 24 * 60 * 60 * 1000;

function finiteNumber(value, fallback = null) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function visibleHistoryPoints(horizonDays) {
  if (horizonDays <= 1) return 14;
  if (horizonDays <= 7) return 30;
  return 60;
}

export function buildForecastChartData(series, forecast, generatedAt) {
  const horizonDays = Math.max(1, finiteNumber(forecast?.horizon_days, 1));
  const history = (series || [])
    .map((point) => ({
      timestamp: new Date(point.timestamp).getTime(),
      actualPrice: finiteNumber(point.price),
    }))
    .filter((point) => Number.isFinite(point.timestamp) && point.actualPrice != null)
    .slice(-visibleHistoryPoints(horizonDays));

  const lastTimestamp = history.at(-1)?.timestamp;
  const generatedTimestamp = new Date(generatedAt).getTime();
  const anchorTimestamp = Math.max(
    Number.isFinite(lastTimestamp) ? lastTimestamp : 0,
    Number.isFinite(generatedTimestamp) ? generatedTimestamp : 0
  ) || Date.now();
  const anchorPrice = finiteNumber(
    forecast?.base_price,
    history.at(-1)?.actualPrice
  );
  const targetPrice = finiteNumber(forecast?.target_price, anchorPrice);
  if (anchorPrice == null || targetPrice == null) return history;

  if (history.at(-1)?.timestamp === anchorTimestamp) {
    history[history.length - 1] = {
      ...history.at(-1),
      actualPrice: anchorPrice,
      predictedPrice: anchorPrice,
      forecastRange: [anchorPrice, anchorPrice],
      pointType: "current",
    };
  } else {
    history.push({
      timestamp: anchorTimestamp,
      actualPrice: anchorPrice,
      predictedPrice: anchorPrice,
      forecastRange: [anchorPrice, anchorPrice],
      pointType: "current",
    });
  }

  const interval = forecast?.prediction_interval || {};
  const lowerPrice = finiteNumber(interval.lower_price, targetPrice);
  const upperPrice = finiteNumber(interval.upper_price, targetPrice);
  history.push({
    timestamp: anchorTimestamp + horizonDays * DAY_MS,
    predictedPrice: targetPrice,
    forecastRange: [
      Math.min(lowerPrice, upperPrice),
      Math.max(lowerPrice, upperPrice),
    ],
    pointType: "prediction",
  });
  return history;
}

function chartDate(value, locale) {
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(
    new Date(value)
  );
}

function ChartTooltip({ active, payload, locale, copy }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  const predicted = point.pointType === "prediction";
  const price = predicted ? point.predictedPrice : point.actualPrice;
  return (
    <div className="chart-tooltip">
      <span>{chartDate(point.timestamp, locale)}</span>
      <small>{predicted ? copy.chart.predictionPoint : copy.chart.actualPoint}</small>
      <strong>{formatPrice(price)}</strong>
      {predicted && point.forecastRange && (
        <em>
          {copy.chart.range}: {formatPrice(point.forecastRange[0])} - {formatPrice(point.forecastRange[1])}
        </em>
      )}
    </div>
  );
}

function PredictionDot({ cx, cy, payload, color }) {
  if (payload?.pointType !== "prediction" || cx == null || cy == null) return null;
  return (
    <g className="prediction-point">
      <circle cx={cx} cy={cy} r="5" fill={color} stroke="var(--surface)" strokeWidth="3" />
      <text x={cx - 9} y={Math.max(14, cy - 12)} textAnchor="end">
        {formatPrice(payload.predictedPrice)}
      </text>
    </g>
  );
}

function PriceChart({ selected, generatedAt }) {
  const { copy, locale } = useLanguage();
  const forecast = selected.forecast;
  const series = buildForecastChartData(forecast.series, forecast, generatedAt);
  const expectedChange = finiteNumber(forecast.expected_change_pct, 0);
  const directionClass = expectedChange > 0 ? "positive" : expectedChange < 0 ? "negative" : "";
  const forecastColor = expectedChange > 0
    ? "var(--positive)"
    : expectedChange < 0
      ? "var(--negative)"
      : "var(--warning)";

  return (
    <section className="surface chart-panel" aria-labelledby="chart-title">
      <header className="panel-heading">
        <div>
          <span>{copy.chart.eyebrow}</span>
          <h2 id="chart-title">{copy.chart.title(selected.symbol, forecast.horizon_days)}</h2>
        </div>
        <div className="chart-legend">
          <span><i className="actual-line" />{copy.chart.actual}</span>
          <span><i className="prediction-line" />{copy.chart.prediction}</span>
          <span><i className="prediction-range" />{copy.chart.range}</span>
        </div>
      </header>

      <div
        className="chart-price-comparison"
        aria-label={copy.chart.comparisonAria(
          formatPrice(selected.current_price),
          formatPrice(forecast.target_price),
          forecast.horizon_days
        )}
      >
        <div>
          <span>{copy.chart.currentPrice}</span>
          <strong>{formatPrice(selected.current_price)}</strong>
        </div>
        <FiArrowRight aria-hidden="true" />
        <div>
          <span>{copy.chart.predictedPrice(forecast.horizon_days)}</span>
          <strong className={directionClass}>{formatPrice(forecast.target_price)}</strong>
          <small className={directionClass}>
            {formatPercent(forecast.expected_change_pct, true)}
          </small>
        </div>
      </div>

      <div className="chart-area" aria-label={copy.chart.aria(selected.name)}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={series} margin={{ top: 30, right: 18, left: 4, bottom: 0 }}>
            <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="timestamp"
              type="number"
              scale="time"
              domain={["dataMin", "dataMax"]}
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
            <Tooltip
              content={<ChartTooltip locale={locale} copy={copy} />}
              cursor={{ stroke: "var(--chart-cursor)" }}
            />
            <Area
              type="linear"
              dataKey="forecastRange"
              stroke="none"
              fill={forecastColor}
              fillOpacity={0.12}
              isAnimationActive={false}
            />
            <ReferenceLine
              y={forecast.target_price}
              stroke={forecastColor}
              strokeDasharray="5 5"
              strokeOpacity={0.45}
            />
            <Line
              type="monotone"
              dataKey="actualPrice"
              stroke="var(--accent)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: "var(--accent)" }}
              isAnimationActive={false}
            />
            <Line
              type="linear"
              dataKey="predictedPrice"
              stroke={forecastColor}
              strokeWidth={2.5}
              strokeDasharray="7 5"
              dot={<PredictionDot color={forecastColor} />}
              activeDot={{ r: 6, fill: forecastColor }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default PriceChart;

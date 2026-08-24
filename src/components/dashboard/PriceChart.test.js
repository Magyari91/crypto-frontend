import { buildForecastChartData } from "./PriceChart";

function history(days = 60) {
  const start = Date.parse("2026-06-01T00:00:00Z");
  return Array.from({ length: days }, (_, index) => ({
    timestamp: new Date(start + index * 86_400_000).toISOString(),
    price: 100 + index,
  }));
}

test("adds a dated predicted target and widening interval to the actual series", () => {
  const generatedAt = "2026-08-24T08:00:00Z";
  const points = buildForecastChartData(
    history(),
    {
      horizon_days: 7,
      base_price: 160,
      target_price: 168,
      prediction_interval: { lower_price: 150, upper_price: 176 },
    },
    generatedAt
  );

  const current = points.at(-2);
  const prediction = points.at(-1);
  expect(current).toMatchObject({
    timestamp: Date.parse(generatedAt),
    actualPrice: 160,
    predictedPrice: 160,
    forecastRange: [160, 160],
    pointType: "current",
  });
  expect(prediction).toMatchObject({
    timestamp: Date.parse(generatedAt) + 7 * 86_400_000,
    predictedPrice: 168,
    forecastRange: [150, 176],
    pointType: "prediction",
  });
  expect(points).toHaveLength(32);
});

test("uses a shorter visible history for the one-day forecast", () => {
  const points = buildForecastChartData(
    history(),
    {
      horizon_days: 1,
      base_price: 160,
      target_price: 161,
      prediction_interval: { lower_price: 157, upper_price: 164 },
    },
    "2026-08-24T08:00:00Z"
  );

  expect(points).toHaveLength(16);
  expect(points.at(-1).pointType).toBe("prediction");
});

test("keeps the full history and dates the monthly prediction thirty days ahead", () => {
  const generatedAt = "2026-08-24T08:00:00Z";
  const points = buildForecastChartData(
    history(),
    {
      horizon_days: 30,
      base_price: 160,
      target_price: 175,
      prediction_interval: { lower_price: 142, upper_price: 190 },
    },
    generatedAt
  );

  expect(points).toHaveLength(62);
  expect(points.at(-1)).toMatchObject({
    timestamp: Date.parse(generatedAt) + 30 * 86_400_000,
    predictedPrice: 175,
    forecastRange: [142, 190],
    pointType: "prediction",
  });
});

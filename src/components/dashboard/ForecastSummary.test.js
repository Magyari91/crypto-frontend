import { render, screen } from "@testing-library/react";
import ForecastSummary from "./ForecastSummary";


test("renders the calibrated target and prediction interval", () => {
  const { container } = render(
    <ForecastSummary
      generatedAt="2026-07-11T08:00:00+00:00"
      selected={{
        symbol: "BTC",
        name: "Bitcoin",
        image: null,
        change_24h: 1.2,
        current_price: 64000,
        forecast: {
          direction_key: "neutral",
          expected_change_pct: 0,
          target_price: 64000,
          confidence: 48,
          confidence_label: "Visszamért jelminőség",
          horizon_days: 7,
          prediction_interval: {
            confidence_level: 80,
            lower_price: 60000,
            upper_price: 68000,
          },
          probability_forecast: {
            probability_pct: 47,
            candidate_probability_pct: 58.3,
            baseline_probability_pct: 47,
            active: false,
            event: { formula: "P(7 napos hozam >= +1%)" },
            decision: { key: "hold", label: "HOLD - modell tartalékban" },
          },
        },
      }}
    />
  );

  expect(screen.getByText("Kalibrált célérték")).toBeInTheDocument();
  expect(screen.getByText(/80% sáv:/)).toHaveTextContent("60 000 USD - 68 000 USD");
  expect(screen.getByText("P(7 napos hozam >= +1%)")).toBeInTheDocument();
  expect(screen.getByText("47,00%")).toBeInTheDocument();
  expect(screen.getByText(/jelölt: 58,30%/)).toBeInTheDocument();
  expect(screen.getByRole("progressbar", { name: "Emelkedési esemény valószínűsége" })).toBeInTheDocument();
  expect(container.querySelector(".asset-symbol-avatar")).toHaveTextContent("B");
});

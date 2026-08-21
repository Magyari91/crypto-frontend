import { render, screen } from "@testing-library/react";
import RiskSignals from "./RiskSignals";

const signals = [
  "Oldalazó piac",
  "Valószínűségi kapu aktív",
  "Döntési kapu: HOLD - modell tartalékban",
  "Semleges becslés",
  "Kalibrált ensemble",
  "Átlag feletti forgalom",
  "Funding adat még nem érhető el",
];

test("shows an explicit forecast above the model evidence", () => {
  render(
    <RiskSignals
      risk={5}
      forecast={{
        direction_key: "neutral",
        expected_change_pct: 0,
        target_price: 64000,
        horizon_days: 7,
        confidence: 50,
        support: 60000,
        resistance: 68000,
        volatility: 3.4,
        volatility_label: "Alacsony",
        indicators: { rsi: 51.2 },
        regime: { label: "Oldalazó piac" },
        ensemble: { validation_skill_pct: 0.8 },
        probability_forecast: {
          probability_pct: 47,
          active: false,
          event: { formula: "P(7 napos hozam >= +1%)" },
          decision: { key: "hold", label: "HOLD - modell tartalékban" },
          model: { family: "Kalibrált Logistic Regression" },
          reason: "A védelmi kapu tartalékban tartja a modellt.",
          calibration: { holdout_brier_skill_pct: -1.1, roc_auc: 0.499 },
          stability: { positive_blocks: 0, total_blocks: 3 },
          distribution_shift: { status: "stable", score: 0.2 },
          top_features: [],
        },
        signals,
      }}
    />
  );

  expect(screen.getByText("Aktuális modelljelzés")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "HOLD - modell tartalékban" })).toBeInTheDocument();
  expect(screen.getByText("7 napos előrejelzés · Semleges")).toBeInTheDocument();
  expect(screen.getByText("64 000 USD")).toBeInTheDocument();
  expect(screen.getByText("P(7 napos hozam >= +1%)")).toBeInTheDocument();
  expect(screen.getByText("47,00%")).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(7);
  expect(document.getElementById("signals")).toBeInTheDocument();
});

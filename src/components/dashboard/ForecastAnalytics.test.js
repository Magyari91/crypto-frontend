import { render, screen } from "@testing-library/react";
import ForecastAnalytics from "./ForecastAnalytics";


const analytics = {
  asset: { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  horizon_days: 7,
  backtest: {
    period: {
      from: "2025-01-01T00:00:00+00:00",
      to: "2025-07-01T00:00:00+00:00",
    },
    summary: {
      samples: 42,
      directional_accuracy: 58.33,
      active_directional_accuracy: 64.29,
      signal_coverage_pct: 33.33,
      mae_pct: 3.2,
      baseline_mae_pct: 3.7,
      technical_mae_pct: 3.5,
      skill_vs_baseline_pct: 13.51,
      skill_vs_technical_pct: 8.57,
      specialist_usage_pct: 24,
      beats_baseline: true,
      probability: {
        target_return_pct: 1,
        brier_score: 0.2012,
        baseline_brier_score: 0.2293,
        brier_skill_pct: 12.25,
        log_loss: 0.61,
        roc_auc: 0.641,
        calibration_error_pct: 5.1,
        buy_precision_pct: 66.67,
        buy_recall_pct: 22.2,
        buy_signal_coverage_pct: 14.29,
        active_model_usage_pct: 42.86,
        reliability_bins: [
          {
            from_pct: 40,
            to_pct: 60,
            samples: 24,
            mean_probability_pct: 48.2,
            observed_frequency_pct: 50,
          },
        ],
      },
    },
    recent_results: [
      {
        forecast_at: "2025-06-20T00:00:00+00:00",
        predicted_direction: "bullish",
        predicted_change_pct: 2.5,
        actual_change_pct: 3.1,
        hit: true,
      },
    ],
    agreement_bands: [
      { label: "38-49%", samples: 4, total_samples: 12, directional_accuracy: 50 },
      { label: "50-64%", samples: 6, total_samples: 20, directional_accuracy: 60 },
      { label: "65-78%", samples: 4, total_samples: 10, directional_accuracy: 70 },
    ],
    methodology: "Csak a korábban elérhető adatokat használja.",
  },
  history: [
    {
      id: 1,
      model_version: "2.0.0",
      generated_at: "2026-07-10T12:00:00+00:00",
      due_at: "2026-07-17T12:00:00+00:00",
      direction_key: "bullish",
      base_price: 64000,
      target_price: 66000,
      event_probability_pct: 63.5,
      status: "pending",
    },
  ],
  training_readiness: {
    status: "storage_required",
    ready_for_training: false,
    reason: "A minták az újraindításkor elvesznek. Tartós PostgreSQL szükséges az élő modell tanításához.",
    sample_count: 18,
    labeled_sample_count: 4,
    independent_labeled_days: 3,
    overdue_sample_count: 2,
    label_coverage_pct: 22.22,
    minimum_independent_labels: 360,
    remaining_independent_labels: 357,
    progress_pct: 0.83,
    next_due_at: "2026-07-18T12:00:00+00:00",
    storage: { backend: "sqlite", persistent: false },
  },
};


test("renders backtest metrics and the live forecast journal", () => {
  render(
    <ForecastAnalytics
      data={analytics}
      loading={false}
      error=""
      onRetry={() => {}}
    />
  );

  expect(screen.getByRole("heading", { name: "Modell teljesítménye" })).toBeInTheDocument();
  expect(screen.getByText(/42 walk-forward minta/)).toBeInTheDocument();
  expect(screen.getByText("0,2012")).toBeInTheDocument();
  expect(screen.getByText("+12,25%")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Kalibrációs sávok" })).toBeInTheDocument();
  expect(screen.getByText("63,50%")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Előrejelzési előzmények" })).toBeInTheDocument();
  expect(screen.getByText(/Kiértékelés:/)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Tanítási készültség" })).toBeInTheDocument();
  expect(screen.getByText("Tartós tárhely szükséges")).toBeInTheDocument();
  expect(screen.getByText("3/360")).toBeInTheDocument();
  expect(screen.getByText(/2 lejárt minta vár címkére/)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Modelllabor" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Órás ellenőrzés" })).toBeInTheDocument();
});

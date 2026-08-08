import { render, screen } from "@testing-library/react";
import DerivativesMetrics from "./DerivativesMetrics";


test("renders futures context with funding and order-flow metrics", () => {
  render(
    <DerivativesMetrics
      data={{
        available: true,
        funding_rate_pct: 0.0046,
        funding_7d_avg_pct: 0.005,
        funding_history_days: 365,
        open_interest_usd: 12_000_000_000,
        open_interest_change_7d_pct: 4.2,
        long_short_ratio: 1.25,
        long_account_pct: 55.6,
        taker_buy_sell_ratio: 1.1,
        taker_buy_share_pct: 52.4,
      }}
    />
  );

  expect(screen.getByText("Származtatott piaci kontextus")).toBeInTheDocument();
  expect(screen.getByText("365 nap funding-előzmény")).toBeInTheDocument();
  expect(screen.getByText("0,0046%")).toBeInTheDocument();
  expect(screen.getByText("1,25×")).toBeInTheDocument();
  expect(screen.getByText("Vételi rész: 52,40%")).toBeInTheDocument();
});


test("does not turn unavailable ratios into zero", () => {
  render(<DerivativesMetrics data={{ available: false }} />);

  expect(screen.queryByText("0,00×")).not.toBeInTheDocument();
  expect(screen.getByText("Átmenetileg nincs adat")).toBeInTheDocument();
});

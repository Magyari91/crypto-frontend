import { fireEvent, render, screen } from "@testing-library/react";
import DataHealthPanel from "./DataHealthPanel";

const data = {
  status: "healthy",
  collector: {
    latest_snapshot_at: "2026-08-19T05:34:15+00:00",
    latest_snapshot_age_minutes: 8,
    interval_minutes: 15,
  },
  storage: {
    database_size_bytes: 8 * 1024 * 1024,
    limit_bytes: 512 * 1024 * 1024,
    utilization_pct: 1.5625,
  },
  totals: {
    active_dataset_count: 1,
    expected_dataset_count: 30,
    dataset_coverage_pct: 3.33,
    snapshot_count: 2,
    outcome_count: 1,
    pending_count: 1,
    overdue_count: 0,
  },
  horizons: [
    {
      horizon_days: 1,
      active_dataset_count: 1,
      expected_dataset_count: 10,
      snapshot_count: 2,
      outcome_count: 1,
      overdue_count: 0,
      ready_dataset_count: 0,
    },
    {
      horizon_days: 7,
      active_dataset_count: 0,
      expected_dataset_count: 10,
      snapshot_count: 0,
      outcome_count: 0,
      overdue_count: 0,
      ready_dataset_count: 0,
    },
    {
      horizon_days: 30,
      active_dataset_count: 0,
      expected_dataset_count: 10,
      snapshot_count: 0,
      outcome_count: 0,
      overdue_count: 0,
      ready_dataset_count: 0,
    },
  ],
};

test("renders production data collection health and refreshes it", () => {
  const onRetry = jest.fn();

  render(<DataHealthPanel data={data} onRetry={onRetry} />);

  expect(screen.getByRole("heading", { name: "Adatgyűjtés állapota" })).toBeInTheDocument();
  expect(screen.getByText("Adatút rendben")).toBeInTheDocument();
  expect(screen.getByText("1/30")).toBeInTheDocument();
  expect(screen.getByText("8,00 MB / 512,00 MB")).toBeInTheDocument();
  expect(screen.getByRole("rowheader", { name: "1 nap" })).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Adatgyűjtési állapot frissítése" }));
  expect(onRetry).toHaveBeenCalledTimes(1);
});

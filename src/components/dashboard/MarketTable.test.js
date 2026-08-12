import { fireEvent, render, screen } from "@testing-library/react";
import MarketTable from "./MarketTable";


const rows = Array.from({ length: 30 }, (_, index) => {
  const rank = index + 1;
  return {
    id: `asset-${rank}`,
    name: `Asset ${rank}`,
    symbol: `A${rank}`,
    current_price: rank,
    market_cap: (31 - rank) * 1_000_000,
    market_cap_rank: rank,
    change_24h: rank - 15,
    change_7d: 1,
    analysis_available: rank === 1 || rank === 30,
    analysis_rank: rank === 1 ? 1 : rank === 30 ? 10 : null,
  };
});

const catalog = {
  source: "CoinGecko",
  count: 30,
  analysis_limit: 10,
  items: rows,
};

test("searches, filters, paginates and opens eligible analysis", () => {
  const onAnalyze = jest.fn();
  render(
    <MarketTable
      catalog={catalog}
      selectedCoin="asset-1"
      onAnalyze={onAnalyze}
      onRetry={jest.fn()}
    />
  );

  expect(screen.getByText("1–25 / 30")).toBeInTheDocument();
  expect(screen.getByText("Asset 25")).toBeInTheDocument();
  expect(screen.queryByText("Asset 26")).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Következő oldal" }));
  expect(screen.getByText("Asset 26")).toBeInTheDocument();
  expect(screen.getByText("26–30 / 30")).toBeInTheDocument();

  fireEvent.change(screen.getByRole("searchbox", { name: "Piaclista keresése" }), {
    target: { value: "A30" },
  });
  expect(screen.getByText("Asset 30")).toBeInTheDocument();
  expect(screen.getByText("1–1 / 1")).toBeInTheDocument();

  fireEvent.click(
    screen.getByRole("button", { name: "Asset 30 elemzésének megnyitása" })
  );
  expect(onAnalyze).toHaveBeenCalledWith("asset-30");

  fireEvent.change(screen.getByRole("searchbox", { name: "Piaclista keresése" }), {
    target: { value: "" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Elemezhető" }));
  expect(screen.getByText("Asset 1")).toBeInTheDocument();
  expect(screen.getByText("Asset 30")).toBeInTheDocument();
  expect(screen.queryByText("Asset 2")).not.toBeInTheDocument();
});

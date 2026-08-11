import { render, screen } from "@testing-library/react";
import NewsPanel from "./NewsPanel";


test("renders article and aggregate sentiment signals", () => {
  render(
    <NewsPanel
      asset={{ symbol: "BTC" }}
      sentiment={{
        score: 0.42,
        label: "positive",
        confidence_pct: 68,
        sample_size: 2,
        source_count: 2,
        scope: "asset",
        positive_pct: 50,
        neutral_pct: 0,
        negative_pct: 50,
        trend: "improving",
        trend_delta: 0.18,
        forecast_weight_pct: 0,
      }}
      articles={[
        {
          id: "story-1",
          title: "Bitcoin market update",
          url: "https://example.test/bitcoin",
          source: "CoinDesk",
          published_at: "2026-07-10T05:13:48+00:00",
          image: "https://example.test/bitcoin.jpg",
          summary: "The latest Bitcoin market developments.",
          sentiment: { score: 0.62, label: "positive" },
        },
        {
          id: "story-2",
          title: "Ethereum network update",
          url: "https://example.test/ethereum",
          source: "Decrypt",
          published_at: "2026-07-10T04:00:00+00:00",
          summary: "The latest Ethereum network developments.",
          sentiment: { score: -0.31, label: "negative" },
        },
      ]}
    />
  );

  expect(screen.getByText("2 hírforrás")).toBeInTheDocument();
  expect(screen.getByLabelText("Hírhangulat összegzés")).toBeInTheDocument();
  expect(screen.getByText("BTC hírhangulat")).toBeInTheDocument();
  expect(screen.getByText("68%")).toBeInTheDocument();
  expect(screen.getByText("0% modell súly")).toBeInTheDocument();
  expect(screen.getByText("+0.62")).toBeInTheDocument();
  expect(screen.getByText("-0.31")).toBeInTheDocument();
  expect(screen.getByText("Bitcoin market update")).toBeInTheDocument();
  expect(screen.getByText("Ethereum network update")).toBeInTheDocument();
  expect(screen.getAllByRole("link")).toHaveLength(2);
});

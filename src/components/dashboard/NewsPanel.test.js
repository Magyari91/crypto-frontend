import { render, screen } from "@testing-library/react";
import NewsPanel from "./NewsPanel";


test("renders normalized articles from multiple news sources", () => {
  render(
    <NewsPanel
      articles={[
        {
          id: "story-1",
          title: "Bitcoin market update",
          url: "https://example.test/bitcoin",
          source: "CoinDesk",
          published_at: "2026-07-10T05:13:48+00:00",
          image: "https://example.test/bitcoin.jpg",
          summary: "The latest Bitcoin market developments.",
        },
        {
          id: "story-2",
          title: "Ethereum network update",
          url: "https://example.test/ethereum",
          source: "Decrypt",
          published_at: "2026-07-10T04:00:00+00:00",
          summary: "The latest Ethereum network developments.",
        },
      ]}
    />
  );

  expect(screen.getByText("2 ellenőrzött hírforrás")).toBeInTheDocument();
  expect(screen.getByText("Bitcoin market update")).toBeInTheDocument();
  expect(screen.getByText("Ethereum network update")).toBeInTheDocument();
  expect(screen.getAllByRole("link")).toHaveLength(2);
});

import { render, screen } from "@testing-library/react";
import MoversPanel from "./MoversPanel";


test("uses actual price direction and fallback avatars for movers", () => {
  render(
    <MoversPanel
      movers={{
        gainers: [
          {
            id: "bitcoin",
            symbol: "BTC",
            image: null,
            current_price: 64000,
            change_24h: -0.3,
          },
        ],
        losers: [],
      }}
    />
  );

  expect(screen.getByText("Legjobbak")).toBeInTheDocument();
  expect(screen.getByText("-0,30%")).toHaveClass("negative");
  expect(document.querySelector(".mover-symbol-avatar")).toHaveTextContent("B");
});

import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the dashboard controls while market data is loading", () => {
  global.fetch = jest.fn(() => new Promise(() => {}));

  render(<App />);

  expect(
    screen.getByRole("heading", { name: /piaci állapot és rövid távú modellnézet/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "BTC" })).toBeInTheDocument();
  expect(screen.getByLabelText(/saját kockázati profil/i)).toBeInTheDocument();
});

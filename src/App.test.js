import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the dashboard controls while market data is loading", () => {
  global.fetch = jest.fn(() => new Promise(() => {}));

  render(<App />);

  expect(
    screen.getByRole("heading", { name: /piaci állapot és rövid távú modellnézet/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "BTC" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "BNB" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "ADA" })).toBeInTheDocument();
  expect(screen.getByLabelText(/saját kockázati profil/i)).toBeInTheDocument();
});

test("renders data collection health while market data is still loading", () => {
  global.fetch = jest.fn(() => new Promise(() => {}));

  render(<App view="models" />);

  expect(
    screen.getByRole("heading", { name: "Adatgyűjtés állapota" })
  ).toBeInTheDocument();
  expect(screen.getByText("Az adatút állapotának betöltése...")).toBeInTheDocument();
});

import { render, screen, waitFor } from "@testing-library/react";
import Sidebar from "./Sidebar";

afterEach(() => {
  window.history.replaceState(null, "", "/");
});

test("marks the hash-linked signals navigation item as active", async () => {
  window.history.replaceState(null, "", "/forecast/bitcoin#signals");

  render(<Sidebar online loading={false} activeView="forecast" coin="bitcoin" />);

  const signalsLink = screen.getByRole("link", { name: "Jelzések" });
  const forecastLink = screen.getByRole("link", { name: "Előrejelzés" });

  await waitFor(() => expect(signalsLink).toHaveClass("active"));
  expect(signalsLink).toHaveAttribute("aria-current", "page");
  expect(forecastLink).not.toHaveClass("active");
});

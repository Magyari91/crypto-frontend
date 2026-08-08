import { formatCompactCurrency, formatPercent, formatPrice } from "./formatters";


test("formats unavailable market values as missing instead of zero", () => {
  expect(formatPrice(null)).toBe("-");
  expect(formatCompactCurrency(null)).toBe("-");
  expect(formatPercent(null)).toBe("-");
});

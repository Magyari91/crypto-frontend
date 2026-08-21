import {
  formatCompactCurrency,
  formatPercent,
  formatPrice,
  formatPublicationTime,
  setFormatterLocale,
} from "./formatters";


test("formats unavailable market values as missing instead of zero", () => {
  expect(formatPrice(null)).toBe("-");
  expect(formatCompactCurrency(null)).toBe("-");
  expect(formatPercent(null)).toBe("-");
});

test("formats automatic publication timestamps", () => {
  setFormatterLocale("hu-HU");
  expect(formatPublicationTime("2026-07-13T00:12:00+00:00")).toMatch(/júl\. 13\./);
});

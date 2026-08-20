import { translateApiText, translateFeatureLabel } from "./apiText";

test("translates structured forecast explanations for the English interface", () => {
  expect(translateApiText("P(7 napos hozam >= +1%)", "en")).toBe(
    "P(7-day return >= +1%)"
  );
  expect(
    translateApiText(
      "Valószínűségi kapu: A validáció szerint a historikus alapesély volt a legpontosabb.",
      "en"
    )
  ).toBe("Probability gate: The historical baseline was most accurate in validation.");
  expect(
    translateFeatureLabel({ key: "volatility_30d", label: "30 napos volatilitás" }, "en")
  ).toBe("30-day volatility");
});

test("keeps Hungarian and unknown API text unchanged", () => {
  expect(translateApiText("Trendelő piac", "hu")).toBe("Trendelő piac");
  expect(translateApiText("External model label", "en")).toBe("External model label");
});

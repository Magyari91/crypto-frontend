import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LanguageSwitcher from "./LanguageSwitcher";
import { LanguageProvider, useLanguage } from "../i18n/LanguageContext";
import { setFormatterLocale } from "../utils/formatters";

function LanguageHarness() {
  const { copy } = useLanguage();

  return (
    <>
      <h1>{copy.pages.dashboard.title}</h1>
      <LanguageSwitcher />
    </>
  );
}

afterEach(() => {
  window.localStorage.clear();
  document.documentElement.lang = "hu";
  setFormatterLocale("hu-HU");
});

test("switches to English and persists the selection", async () => {
  window.localStorage.setItem("cryptovision-language", "hu");

  const { unmount } = render(
    <LanguageProvider>
      <LanguageHarness />
    </LanguageProvider>
  );

  fireEvent.change(screen.getByLabelText("Nyelv kiválasztása"), {
    target: { value: "en" },
  });

  expect(screen.getByRole("heading", { name: "Market status and short-term model view" }))
    .toBeInTheDocument();
  expect(document.documentElement.lang).toBe("en");
  expect(window.localStorage.getItem("cryptovision-language")).toBe("en");

  unmount();
  render(
    <LanguageProvider>
      <LanguageHarness />
    </LanguageProvider>
  );

  await waitFor(() => {
    expect(screen.getByLabelText("Select language")).toHaveValue("en");
  });
});

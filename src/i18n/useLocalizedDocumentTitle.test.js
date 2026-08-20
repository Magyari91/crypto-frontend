import { render, waitFor } from "@testing-library/react";
import { useLocalizedDocumentTitle } from "./useLocalizedDocumentTitle";

function TitleHarness({ title }) {
  useLocalizedDocumentTitle(title);
  return null;
}

test("keeps the localized title after a later head update", async () => {
  const { rerender } = render(<TitleHarness title="English title | CryptoVision" />);

  expect(document.title).toBe("English title | CryptoVision");
  document.title = "Server title | CryptoVision";

  await waitFor(() => {
    expect(document.title).toBe("English title | CryptoVision");
  });

  rerender(<TitleHarness title="Magyar cím | CryptoVision" />);
  expect(document.title).toBe("Magyar cím | CryptoVision");
});

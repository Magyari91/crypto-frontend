"use client";

import { useRouter } from "next/navigation";
import App from "../../src/App";
import { findAnalyzedCoin } from "../../src/config/coins";
import { useLanguage } from "../../src/i18n/LanguageContext";
import { useLocalizedDocumentTitle } from "../../src/i18n/useLocalizedDocumentTitle";

type DashboardView = "dashboard" | "market" | "forecast" | "models" | "news";

type DashboardClientProps = {
  initialCoin?: string;
  view?: DashboardView;
};

export default function DashboardClient({
  initialCoin = "bitcoin",
  view = "dashboard",
}: DashboardClientProps) {
  const router = useRouter();
  const { copy } = useLanguage();
  const syncCoinToRoute = view === "forecast";
  const coin = findAnalyzedCoin(initialCoin);
  const pageCopy =
    view === "forecast" && coin
      ? {
          eyebrow: copy.pages.forecast.eyebrow(coin.symbol),
          title: copy.pages.forecast.title(coin.name),
          description: copy.pages.forecast.description(coin.symbol),
        }
      : copy.pages[view] || copy.pages.dashboard;
  useLocalizedDocumentTitle(`${pageCopy.title} | CryptoVision`);

  return (
    <App
      initialCoin={initialCoin}
      view={view}
      pageEyebrow={pageCopy.eyebrow}
      pageTitle={pageCopy.title}
      pageDescription={pageCopy.description}
      onCoinNavigate={
        syncCoinToRoute ? (coinId: string) => router.push(`/forecast/${coinId}`) : undefined
      }
      onOpenAnalysis={(coinId: string) => router.push(`/forecast/${coinId}`)}
    />
  );
}

"use client";

import { useRouter } from "next/navigation";
import App from "../../src/App";

type DashboardView = "dashboard" | "market" | "forecast" | "models" | "news";

type DashboardClientProps = {
  initialCoin?: string;
  view?: DashboardView;
  pageEyebrow?: string;
  pageTitle?: string;
  pageDescription?: string;
};

export default function DashboardClient({
  initialCoin = "bitcoin",
  view = "dashboard",
  pageEyebrow,
  pageTitle,
  pageDescription,
}: DashboardClientProps) {
  const router = useRouter();
  const syncCoinToRoute = view === "forecast";

  return (
    <App
      initialCoin={initialCoin}
      view={view}
      pageEyebrow={pageEyebrow}
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      onCoinNavigate={
        syncCoinToRoute ? (coinId: string) => router.push(`/forecast/${coinId}`) : undefined
      }
      onOpenAnalysis={(coinId: string) => router.push(`/forecast/${coinId}`)}
    />
  );
}

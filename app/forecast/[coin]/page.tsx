import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ANALYZED_COINS, findAnalyzedCoin } from "../../../src/config/coins";
import { SITE_URL } from "../../../src/config/site";
import DashboardClient from "../../_components/DashboardClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return ANALYZED_COINS.map((coin) => ({ coin: coin.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ coin: string }>;
}): Promise<Metadata> {
  const { coin: coinId } = await params;
  const coin = findAnalyzedCoin(coinId);
  if (!coin) return {};

  const title = `${coin.name} (${coin.symbol}) árfolyam-előrejelzés`;
  const description = `${coin.name} valószínűségi árfolyam-előrejelzése 24 órás, 7 és 30 napos időtávra, kockázati jelekkel és visszamért modellpontossággal.`;

  return {
    title,
    description,
    alternates: { canonical: `/forecast/${coin.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/forecast/${coin.id}`,
    },
  };
}

export default async function ForecastPage({
  params,
}: {
  params: Promise<{ coin: string }>;
}) {
  const { coin: coinId } = await params;
  const coin = findAnalyzedCoin(coinId);
  if (!coin) notFound();

  return (
    <DashboardClient
      initialCoin={coin.id}
      view="forecast"
      pageEyebrow={`${coin.symbol} modellnézet`}
      pageTitle={`${coin.name} árfolyam-előrejelzés`}
      pageDescription={`Valószínűségi forgatókönyvek, ársávok, hírsentiment és walk-forward teljesítmény ${coin.symbol} adatokon.`}
    />
  );
}

import type { Metadata } from "next";
import DashboardClient from "../_components/DashboardClient";

export const metadata: Metadata = {
  title: "Kriptovaluta árfolyamok",
  description:
    "Kereshető és rendezhető kriptovaluta árfolyamtábla 100–200 eszközzel, piaci szélsőértékekkel.",
  alternates: { canonical: "/market" },
};

export default function MarketPage() {
  return (
    <DashboardClient
      view="market"
      pageEyebrow="Piaci szkenner"
      pageTitle="Kriptovaluta árfolyamok"
      pageDescription="Szűrhető piaclista, piaci szélesség és napi szélsőértékek; részletes modell a top 10 eszközhöz."
    />
  );
}

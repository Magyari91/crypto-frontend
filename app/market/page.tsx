import type { Metadata } from "next";
import DashboardClient from "../_components/DashboardClient";

export const metadata: Metadata = {
  title: "Kriptovaluta árfolyamok",
  description:
    "Kereshető és rendezhető kriptovaluta árfolyamtábla 100–200 eszközzel, piaci szélsőértékekkel.",
  alternates: { canonical: "/market" },
};

export default function MarketPage() {
  return <DashboardClient view="market" />;
}

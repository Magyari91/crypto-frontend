import type { Metadata } from "next";
import DashboardClient from "../_components/DashboardClient";

export const metadata: Metadata = {
  title: "Kriptohírek és sentiment",
  description:
    "Friss kriptohírek, eszközönkénti sentiment és a hírszignál előrejelzésben betöltött szerepe.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <DashboardClient
      view="news"
      pageEyebrow="Hírfolyam és sentiment"
      pageTitle="Kriptohírek piaci kontextusban"
      pageDescription="A legfrissebb hírek hangulata, forrásai és modellben alkalmazott súlya eszközönként."
    />
  );
}

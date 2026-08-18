import type { Metadata } from "next";
import DashboardClient from "../_components/DashboardClient";

export const metadata: Metadata = {
  title: "Előrejelző modellek teljesítménye",
  description:
    "Walk-forward visszamérés, kalibráció, modell-előny, drift és előrejelzési napló a CryptoVision modellekhez.",
  alternates: { canonical: "/models" },
};

export default function ModelsPage() {
  return (
    <DashboardClient
      view="models"
      pageEyebrow="Modellmonitor"
      pageTitle="Előrejelző modellek teljesítménye"
      pageDescription="Visszamérési metrikák, kalibráció, modellnapló és tanítási készültség egy auditálható nézetben."
    />
  );
}

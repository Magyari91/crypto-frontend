import type { Metadata } from "next";
import LocalizedEditorialPage from "../_components/LocalizedEditorialPage";

export const metadata: Metadata = {
  title: "Előrejelzési módszertan",
  description:
    "A CryptoVision adatforrásainak, modellválasztásának, walk-forward validációjának és korlátainak leírása.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return <LocalizedEditorialPage pageKey="methodology" />;
}

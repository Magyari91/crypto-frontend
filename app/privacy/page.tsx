import type { Metadata } from "next";
import LocalizedEditorialPage from "../_components/LocalizedEditorialPage";

export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató",
  description: "A CryptoVision adatkezelési tájékoztatója.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LocalizedEditorialPage pageKey="privacy" />;
}

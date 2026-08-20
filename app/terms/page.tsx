import type { Metadata } from "next";
import LocalizedEditorialPage from "../_components/LocalizedEditorialPage";

export const metadata: Metadata = {
  title: "Felhasználási feltételek",
  description: "A CryptoVision dashboard felhasználási és kockázati feltételei.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LocalizedEditorialPage pageKey="terms" />;
}

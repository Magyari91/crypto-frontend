import type { Metadata } from "next";
import LocalizedEditorialPage from "../_components/LocalizedEditorialPage";

export const metadata: Metadata = {
  title: "A CryptoVision projektről",
  description: "A CryptoVision célja és szerkesztési alapelvei.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <LocalizedEditorialPage pageKey="about" />;
}

import type { Metadata } from "next";
import LocalizedEditorialPage from "../_components/LocalizedEditorialPage";

export const metadata: Metadata = {
  title: "Cookie-tájékoztató",
  description: "A CryptoVision helyi tárolási, mérési és hirdetési beállításai.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return <LocalizedEditorialPage pageKey="cookies" />;
}

import type { Metadata } from "next";
import DashboardClient from "./_components/DashboardClient";

export const metadata: Metadata = {
  title: "Kriptopiaci dashboard",
  description:
    "Élő kriptopiaci áttekintés, top 10 előrejelzés, hírsentiment és modell-visszamérés.",
  alternates: { canonical: "/" },
};

export default function DashboardPage() {
  return <DashboardClient />;
}

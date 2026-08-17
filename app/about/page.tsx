import type { Metadata } from "next";
import EditorialShell from "../_components/EditorialShell";

export const metadata: Metadata = {
  title: "A CryptoVision projektről",
  description: "A CryptoVision célja és szerkesztési alapelvei.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <EditorialShell
      eyebrow="A projektről"
      title="Ellenőrizhetőbb kriptopiaci előrejelzés"
      lead="A CryptoVision célja nem a biztosnak tűnő célár, hanem a bizonytalanság, a kockázat és a modell múltbeli teljesítményének közös bemutatása."
    >
      <section>
        <h2>Szerkesztési alapelvek</h2>
        <p>
          Az adatforrást, a mérési időpontot és a modellverziót a felület elkülöníti. A
          sikertelen vagy tartózkodó jelzés ugyanúgy része a naplónak, mint a kedvező
          kimenet; a visszamérést reklám- vagy partnerkapcsolat nem írhatja felül.
        </p>
      </section>
      <section>
        <h2>Elemzési kör</h2>
        <p>
          A széles árfolyamtábla legfeljebb 200 eszközt követ. A számításigényes,
          részletes előrejelzés a kijelölt top 10 kriptoeszközre készül, egységes
          validációs és adatminőségi követelményekkel.
        </p>
      </section>
    </EditorialShell>
  );
}

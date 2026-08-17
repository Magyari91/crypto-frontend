import type { Metadata } from "next";
import EditorialShell from "../_components/EditorialShell";

export const metadata: Metadata = {
  title: "Előrejelzési módszertan",
  description:
    "A CryptoVision adatforrásainak, modellválasztásának, walk-forward validációjának és korlátainak leírása.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <EditorialShell
      eyebrow="Átláthatóság"
      title="Előrejelzési módszertan"
      lead="A jelzés csak akkor értelmezhető, ha az adatok, az időtáv és a bizonytalanság is látható mellette."
    >
      <section>
        <h2>Adatfolyam</h2>
        <p>
          A rendszer OHLCV piaci adatokat, technikai jellemzőket, derivatív piaci
          mutatókat és hírsentimentet használ. Minden nézet jelzi az adat frissességét,
          a hiányzó forrásokat pedig nem helyettesíti automatikusan nullával.
        </p>
      </section>
      <section>
        <h2>Időtávhoz választott modellek</h2>
        <p>
          A 24 órás, 7 napos és 30 napos feladat eltérő piaci dinamikát mér. A rendszer
          ezért időtávonként specialistamodellt, technikai alapszintet és kalibrált
          valószínűségi réteget hasonlít össze. Egy összetettebb modell csak bizonyított
          holdout-előny esetén kerülhet az aktív jelzésbe.
        </p>
      </section>
      <section>
        <h2>Visszamérés</h2>
        <p>
          A teljesítmény időrendi walk-forward felosztáson készül. A fő mérőszámok az
          irányhelyesség, a MAE, a Brier score, a ROC AUC, a kalibrációs hiba és az
          empirikus ársáv lefedettsége. Az éles előrejelzés és a kísérleti challenger
          eredménye külön jelenik meg.
        </p>
      </section>
      <section>
        <h2>Korlátok</h2>
        <p>
          A kriptopiac rezsimváltásai, likviditási sokkjai és külső eseményei a historikus
          mintától jelentősen eltérhetnek. A valószínűségek becslések, nem garantált
          kimenetek, és nem minősülnek személyre szabott befektetési ajánlásnak.
        </p>
      </section>
    </EditorialShell>
  );
}

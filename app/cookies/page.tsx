import type { Metadata } from "next";
import EditorialShell from "../_components/EditorialShell";

export const metadata: Metadata = {
  title: "Cookie-tájékoztató",
  description: "A CryptoVision helyi tárolási, mérési és hirdetési beállításai.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <EditorialShell
      eyebrow="Adatvédelem"
      title="Cookie- és helyi tárolási tájékoztató"
      lead="A szükséges funkciók mindig működnek; a mérés és a hirdetés külön engedélyezhető és később visszavonható."
    >
      <section>
        <h2>Szükséges tárolás</h2>
        <p>
          A <code>cryptovision-theme</code> a világos vagy sötét témát, a
          <code>cryptovision-consent-v1</code> pedig az adatvédelmi választást tárolja a
          böngésző helyi tárában. Ezek nélkül a választott beállítások nem őrizhetők meg.
        </p>
      </section>
      <section>
        <h2>Használati mérés</h2>
        <p>
          A mérési kategória alapértelmezetten kikapcsolt. Aktiválásakor kizárólag a
          később megnevezett, dokumentált analitikai szolgáltatás tölthető be. Az éles
          szolgáltatói listát az integráció előtt ezen az oldalon közzé kell tenni.
        </p>
      </section>
      <section>
        <h2>Hirdetések</h2>
        <p>
          A Google AdSense kódja csak hirdetési hozzájárulás és érvényes kiadói azonosító
          mellett töltődik be. EGT-forgalomnál az AdSense aktiválása előtt Google által
          hitelesített, IAB TCF-kompatibilis hozzájárulás-kezelőt is konfigurálni kell.
        </p>
      </section>
      <section>
        <h2>Beállítás módosítása</h2>
        <p>
          A dashboard láblécében található „Adatvédelmi beállítások” gombbal minden
          opcionális kategória külön módosítható vagy elutasítható.
        </p>
      </section>
    </EditorialShell>
  );
}

import type { Metadata } from "next";
import EditorialShell from "../_components/EditorialShell";

export const metadata: Metadata = {
  title: "Felhasználási feltételek",
  description: "A CryptoVision dashboard felhasználási és kockázati feltételei.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <EditorialShell
      eyebrow="Jogi információ"
      title="Felhasználási feltételek"
      lead="A CryptoVision kutatási és tájékoztatási célú piaci eszköz, nem kereskedési szolgáltatás."
    >
      <section>
        <h2>A szolgáltatás jellege</h2>
        <p>
          A megjelenített árfolyamok, hírek, valószínűségek és modelljelzések általános
          tájékoztatást szolgálnak. Nem személyre szabott befektetési tanácsok, ajánlatok
          vagy ügyletkötési felhívások.
        </p>
      </section>
      <section>
        <h2>Kockázat</h2>
        <p>
          A kriptoeszközök értéke szélsőségesen változhat, részleges vagy teljes veszteség
          is bekövetkezhet. A múltbeli visszamérés nem garantál jövőbeli eredményt, és az
          előrejelzési sáv sem jelent biztos árkorlátot.
        </p>
      </section>
      <section>
        <h2>Adatminőség és rendelkezésre állás</h2>
        <p>
          Külső adatforrások késhetnek, megszakadhatnak vagy hibás értéket adhatnak. A
          felület jelzi a frissességet és a hiányt, de folyamatos, hibamentes elérhetőségre
          nem vállal garanciát.
        </p>
      </section>
      <section>
        <h2>Hirdetés és partnerkapcsolat</h2>
        <p>
          A fizetett megjelenések és partnerhivatkozások egyértelmű jelölést kapnak. A
          hirdető jelenléte nem módosíthatja az előrejelzést vagy annak visszamért
          teljesítményét.
        </p>
      </section>
    </EditorialShell>
  );
}

import type { Metadata } from "next";
import EditorialShell from "../_components/EditorialShell";
import { CONTACT_EMAIL, OPERATOR_NAME } from "../../src/config/site";

export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató",
  description: "A CryptoVision adatkezelési tájékoztatója.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <EditorialShell
      eyebrow="Jogi információ"
      title="Adatkezelési tájékoztató"
      lead="A dashboard alapfunkciói regisztráció nélkül használhatók; opcionális mérés és reklámszolgáltatás csak külön választás alapján indul."
    >
      <section>
        <h2>Adatkezelő</h2>
        <p>{OPERATOR_NAME}</p>
        {CONTACT_EMAIL ? (
          <p>
            Kapcsolat: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        ) : (
          <p>Az üzemeltetői kapcsolati adat az éles kereskedelmi indulás előtt kerül közzétételre.</p>
        )}
      </section>
      <section>
        <h2>Kezelt adatok</h2>
        <p>
          A szükséges helyi tárolás a témaválasztást és a hozzájárulási döntést őrzi.
          Engedélyezés esetén a kiválasztott mérési vagy hirdetési szolgáltató technikai,
          eszköz- és használati adatokat kezelhet saját tájékoztatója szerint.
        </p>
      </section>
      <section>
        <h2>Cél és megőrzés</h2>
        <p>
          Az opcionális mérés célja a hibák és használhatósági problémák feltárása. A
          hirdetési adatkezelés célja a felület finanszírozása. A pontos szolgáltatói,
          jogalap- és megőrzési lista az aktivált szolgáltatásokkal együtt frissítendő.
        </p>
      </section>
      <section>
        <h2>Jogok</h2>
        <p>
          A hozzájárulás bármikor visszavonható az oldal alján elérhető adatvédelmi
          beállításokban. Az érintetti kérelmeket az üzemeltető közzétett kapcsolati címén
          lehet benyújtani.
        </p>
      </section>
    </EditorialShell>
  );
}

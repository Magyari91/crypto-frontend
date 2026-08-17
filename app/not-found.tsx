import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <span className="eyebrow">404</span>
      <h1>Ez az elemzési oldal nem található</h1>
      <p>A részletes előrejelzés jelenleg a kijelölt top 10 kriptoeszközhöz érhető el.</p>
      <Link className="primary-button" href="/">
        Vissza a dashboardra
      </Link>
    </main>
  );
}

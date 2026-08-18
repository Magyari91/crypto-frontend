# CryptoVision frontend

Statikusan exportált Next.js 16 dashboard a CryptoVision FastAPI backendhez. A
felület a széles, legfeljebb 200 eszközös piaclista mellett a kijelölt top 10
kriptovalutához készít részletes, visszamért előrejelzést.

## Architektúra

- Next.js App Router, React 19 és fokozatos TypeScript-migráció
- statikus export a Render Static Site számára
- külön FastAPI backend a piaci és modelladatokhoz
- valódi, indexelhető útvonalak és érménként generált metaadatok
- hozzájárulás után aktiválható analitika- és hirdetési réteg

Fő útvonalak:

- `/` – teljes dashboard
- `/market` – 100–200 eszközös piaci szkenner
- `/forecast/[coin]` – top 10 előrejelzési oldal
- `/models` – walk-forward teljesítmény és modellnapló
- `/news` – hírek és sentiment
- `/methodology` – adat- és modellmódszertan
- `/privacy`, `/cookies`, `/terms` – jogi tájékoztatók

## Helyi indítás

1. Másold a `.env.example` tartalmát `.env.local` néven.
2. Indítsd el a backendet a `http://localhost:8000` címen.
3. Telepítsd és indítsd a frontendet:

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

A dashboard címe: `http://localhost:3000`.

## Környezeti változók

- `NEXT_PUBLIC_API_URL`: a FastAPI backend publikus címe
- `NEXT_PUBLIC_SITE_URL`: a frontend kanonikus, protokollal együtt megadott címe
- `NEXT_PUBLIC_OPERATOR_NAME`: a jogi oldalakon megjelenő üzemeltető
- `NEXT_PUBLIC_CONTACT_EMAIL`: az üzemeltető nyilvános kapcsolati címe
- `NEXT_PUBLIC_ADSENSE_CLIENT`: a jóváhagyott `ca-pub-...` azonosító
- `NEXT_PUBLIC_ADSENSE_CMP_READY`: csak hitelesített CMP beállítása után legyen `true`
- `NEXT_PUBLIC_ADSENSE_SLOT_DASHBOARD`: dashboard hirdetési egység azonosítója
- `NEXT_PUBLIC_ADSENSE_SLOT_MARKET`: piaci oldal hirdetési egység azonosítója

Az AdSense-kód csak hirdetési hozzájárulás, kiadói azonosító és slotazonosító
mellett töltődik be. A build az `ads.txt` tartalmát automatikusan generálja a
kiadói azonosítóból. Az EGT-ben történő éles aktiválás előtt az AdSense
`Privacy & messaging` felületén Google által hitelesített, IAB TCF-kompatibilis
CMP-t is be kell állítani. A beépített kategóriaválasztó önmagában nem helyettesíti
ezt a tanúsítást. A hirdetési script csak `NEXT_PUBLIC_ADSENSE_CMP_READY=true`
értéknél válik betölthetővé.

Az üzemeltetői adatokat és a ténylegesen bekapcsolt adatfeldolgozók listáját az
éles kereskedelmi indulás előtt jogi szakértővel ellenőrizni kell.

## Render telepítés

A repository `render.yaml` fájlja az alábbi beállításokat tartalmazza:

```text
Build command: pnpm install --frozen-lockfile && pnpm run build
Publish directory: out
```

Meglévő Render szolgáltatásnál ezeket a Settings oldalon is ellenőrizni kell,
mert a már létrehozott szolgáltatás nem minden Blueprint-változást vesz át
automatikusan. Saját domain beállításakor a `NEXT_PUBLIC_SITE_URL` értékét is az
új címre kell cserélni, majd új buildet kell indítani.

## Ellenőrzés

```powershell
pnpm test
pnpm build
```

A build a `robots.txt`, `sitemap.xml`, jogi oldalak és mind a tíz statikus
előrejelzési URL elkészítését is ellenőrzi.

A megjelenített előrejelzés kísérleti technikai elemzés, nem személyre szabott
pénzügyi tanács.

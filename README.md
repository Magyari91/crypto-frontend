# CryptoVision frontend

React dashboard a CryptoVision backendhez. A böngésző a piaci összegzés, a technikai
jelzés, a piaclista és a hírek mellett a walk-forward visszamérést és az élő
előrejelzési naplót is megjeleníti.

A v5 előrejelzési nézet piaci rezsimet, időtávhoz választott specialistamodellt,
tanító- és holdoutmintát, modell-előnyt, aktívjel-lefedettséget és 80%-os
empirikus ársávot mutat. A teljesítménynézet az új modellt közvetlenül a v2
technikai modellel is összeveti. Bizonyított előny hiányában a specialista
kikapcsol, a rendszer pedig tartózkodhat az irányjelzéstől.

A fő forecast-sáv külön eseményvalószínűséget jelenít meg, például
`P(7 napos hozam >= +1%)`. Az aktív, kalibrált modell és a historikus alapesély
egyértelműen elkülönül; elutasított modellnél a jelöltérték csak másodlagos
információ. A kockázati nézet Brier-előnyt, ROC AUC-t, stabilitási kaput és
fontos jellemzőket, valamint az adateloszlás eltolódását mutatja. A
teljesítménynézet a publikus becsléstől külön auditálja a tartalékban lévő
challenger Brier score-, kalibrációs hiba- és ROC AUC-értékét.

A főoldal külön futures mérősoron jeleníti meg a Binance USDⓈ-M funding rate,
open interest, globális long/short és taker vételi/eladási adatokat. Hiányzó
futures-forrás esetén a teljes dashboard továbbra is működik, és az állapotot
egyértelműen jelzi. A költséges első walk-forward audit háttérben fut; a kliens
automatikusan újrakéri az eredményt, ezért a többi dashboard-rész nem vár rá.

Az 1 és 7 napos teljesítménynézetben külön Modelllabor indítható. Ez 6480 órás
OHLCV-adaton ellenőrzi az irányjelöltet és a 80%-os mozgási sáv kvantilismodelljét,
majd megmutatja a holdout-előnyt, lefedettséget és a több időblokkon mért
stabilitást. A labor eredménye nem írja felül automatikusan az éles előrejelzést.

## Helyi indítás

1. Másold a `.env.example` tartalmát egy `.env` fájlba.
2. Indítsd el a backendet a `http://localhost:8000` címen.
3. Telepítsd és indítsd a frontendet:

```powershell
npm install
npm start
```

A dashboard címe: `http://localhost:3000`

## Éles környezet

Állítsd be a `REACT_APP_API_URL` változót a telepített backend címére. Az alkalmazás
alapértelmezett éles címe jelenleg `https://crypto-backend-pv99.onrender.com`.

## Ellenőrzés

```powershell
npm test -- --watchAll=false
npm run build
```

A megjelenített előrejelzés kísérleti technikai jelzés, nem pénzügyi tanács.

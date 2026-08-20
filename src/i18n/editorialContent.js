export const editorialContent = {
  hu: {
    about: {
      eyebrow: "A projektről",
      title: "Ellenőrizhetőbb kriptopiaci előrejelzés",
      lead:
        "A CryptoVision célja nem a biztosnak tűnő célár, hanem a bizonytalanság, a kockázat és a modell múltbeli teljesítményének közös bemutatása.",
      sections: [
        {
          title: "Szerkesztési alapelvek",
          paragraphs: [
            "Az adatforrást, a mérési időpontot és a modellverziót a felület elkülöníti. A sikertelen vagy tartózkodó jelzés ugyanúgy része a naplónak, mint a kedvező kimenet; a visszamérést reklám- vagy partnerkapcsolat nem írhatja felül.",
          ],
        },
        {
          title: "Elemzési kör",
          paragraphs: [
            "A széles árfolyamtábla legfeljebb 200 eszközt követ. A számításigényes, részletes előrejelzés a kijelölt top 10 kriptoeszközre készül, egységes validációs és adatminőségi követelményekkel.",
          ],
        },
      ],
    },
    methodology: {
      eyebrow: "Átláthatóság",
      title: "Előrejelzési módszertan",
      lead:
        "A jelzés csak akkor értelmezhető, ha az adatok, az időtáv és a bizonytalanság is látható mellette.",
      sections: [
        {
          title: "Adatfolyam",
          paragraphs: [
            "A rendszer OHLCV piaci adatokat, technikai jellemzőket, derivatív piaci mutatókat és hírsentimentet használ. Minden nézet jelzi az adat frissességét, a hiányzó forrásokat pedig nem helyettesíti automatikusan nullával.",
          ],
        },
        {
          title: "Időtávhoz választott modellek",
          paragraphs: [
            "A 24 órás, 7 napos és 30 napos feladat eltérő piaci dinamikát mér. A rendszer ezért időtávonként specialistamodellt, technikai alapszintet és kalibrált valószínűségi réteget hasonlít össze. Egy összetettebb modell csak bizonyított holdout-előny esetén kerülhet az aktív jelzésbe.",
          ],
        },
        {
          title: "Visszamérés",
          paragraphs: [
            "A teljesítmény időrendi walk-forward felosztáson készül. A fő mérőszámok az irányhelyesség, a MAE, a Brier score, a ROC AUC, a kalibrációs hiba és az empirikus ársáv lefedettsége. Az éles előrejelzés és a kísérleti challenger eredménye külön jelenik meg.",
          ],
        },
        {
          title: "Korlátok",
          paragraphs: [
            "A kriptopiac rezsimváltásai, likviditási sokkjai és külső eseményei a historikus mintától jelentősen eltérhetnek. A valószínűségek becslések, nem garantált kimenetek, és nem minősülnek személyre szabott befektetési ajánlásnak.",
          ],
        },
      ],
    },
    privacy: {
      eyebrow: "Jogi információ",
      title: "Adatkezelési tájékoztató",
      lead:
        "A dashboard alapfunkciói regisztráció nélkül használhatók; opcionális mérés és reklámszolgáltatás csak külön választás alapján indul.",
      sections: [
        { title: "Adatkezelő", kind: "controller", paragraphs: [] },
        {
          title: "Kezelt adatok",
          paragraphs: [
            "A szükséges helyi tárolás a téma- és nyelvválasztást, valamint a hozzájárulási döntést őrzi. Engedélyezés esetén a kiválasztott mérési vagy hirdetési szolgáltató technikai, eszköz- és használati adatokat kezelhet saját tájékoztatója szerint.",
          ],
        },
        {
          title: "Cél és megőrzés",
          paragraphs: [
            "Az opcionális mérés célja a hibák és használhatósági problémák feltárása. A hirdetési adatkezelés célja a felület finanszírozása. A pontos szolgáltatói, jogalap- és megőrzési lista az aktivált szolgáltatásokkal együtt frissítendő.",
          ],
        },
        {
          title: "Jogok",
          paragraphs: [
            "A hozzájárulás bármikor visszavonható az oldal alján elérhető adatvédelmi beállításokban. Az érintetti kérelmeket az üzemeltető közzétett kapcsolati címén lehet benyújtani.",
          ],
        },
      ],
      contact: "Kapcsolat",
      contactPending:
        "Az üzemeltetői kapcsolati adat az éles kereskedelmi indulás előtt kerül közzétételre.",
    },
    cookies: {
      eyebrow: "Adatvédelem",
      title: "Cookie- és helyi tárolási tájékoztató",
      lead:
        "A szükséges funkciók mindig működnek; a mérés és a hirdetés külön engedélyezhető és később visszavonható.",
      sections: [
        {
          title: "Szükséges tárolás",
          paragraphs: [
            "A cryptovision-theme a világos vagy sötét témát, a cryptovision-language a választott nyelvet, a cryptovision-consent-v1 pedig az adatvédelmi választást tárolja a böngésző helyi tárában. Ezek nélkül a választott beállítások nem őrizhetők meg.",
          ],
        },
        {
          title: "Használati mérés",
          paragraphs: [
            "A mérési kategória alapértelmezetten kikapcsolt. Aktiválásakor kizárólag a később megnevezett, dokumentált analitikai szolgáltatás tölthető be. Az éles szolgáltatói listát az integráció előtt ezen az oldalon közzé kell tenni.",
          ],
        },
        {
          title: "Hirdetések",
          paragraphs: [
            "A Google AdSense kódja csak hirdetési hozzájárulás és érvényes kiadói azonosító mellett töltődik be. EGT-forgalomnál az AdSense aktiválása előtt Google által hitelesített, IAB TCF-kompatibilis hozzájárulás-kezelőt is konfigurálni kell.",
          ],
        },
        {
          title: "Beállítás módosítása",
          paragraphs: [
            "A dashboard láblécében található Adatvédelmi beállítások gombbal minden opcionális kategória külön módosítható vagy elutasítható.",
          ],
        },
      ],
    },
    terms: {
      eyebrow: "Jogi információ",
      title: "Felhasználási feltételek",
      lead:
        "A CryptoVision kutatási és tájékoztatási célú piaci eszköz, nem kereskedési szolgáltatás.",
      sections: [
        {
          title: "A szolgáltatás jellege",
          paragraphs: [
            "A megjelenített árfolyamok, hírek, valószínűségek és modelljelzések általános tájékoztatást szolgálnak. Nem személyre szabott befektetési tanácsok, ajánlatok vagy ügyletkötési felhívások.",
          ],
        },
        {
          title: "Kockázat",
          paragraphs: [
            "A kriptoeszközök értéke szélsőségesen változhat, részleges vagy teljes veszteség is bekövetkezhet. A múltbeli visszamérés nem garantál jövőbeli eredményt, és az előrejelzési sáv sem jelent biztos árkorlátot.",
          ],
        },
        {
          title: "Adatminőség és rendelkezésre állás",
          paragraphs: [
            "Külső adatforrások késhetnek, megszakadhatnak vagy hibás értéket adhatnak. A felület jelzi a frissességet és a hiányt, de folyamatos, hibamentes elérhetőségre nem vállal garanciát.",
          ],
        },
        {
          title: "Hirdetés és partnerkapcsolat",
          paragraphs: [
            "A fizetett megjelenések és partnerhivatkozások egyértelmű jelölést kapnak. A hirdető jelenléte nem módosíthatja az előrejelzést vagy annak visszamért teljesítményét.",
          ],
        },
      ],
    },
  },
  en: {
    about: {
      eyebrow: "About",
      title: "More verifiable crypto market forecasts",
      lead:
        "CryptoVision focuses on uncertainty, risk, and historical model performance rather than presenting a target price as certain.",
      sections: [
        {
          title: "Editorial principles",
          paragraphs: [
            "The interface separates the data source, measurement time, and model version. Failed or abstaining signals remain in the journal alongside favorable outcomes, and advertising or partner relationships cannot override backtest results.",
          ],
        },
        {
          title: "Analysis coverage",
          paragraphs: [
            "The broad price table tracks up to 200 assets. Compute-intensive detailed forecasts cover the selected top 10 crypto assets under consistent validation and data-quality requirements.",
          ],
        },
      ],
    },
    methodology: {
      eyebrow: "Transparency",
      title: "Forecasting methodology",
      lead:
        "A signal is meaningful only when its data, horizon, and uncertainty are visible alongside it.",
      sections: [
        {
          title: "Data pipeline",
          paragraphs: [
            "The system uses OHLCV market data, technical features, derivatives-market indicators, and news sentiment. Every view reports data freshness, and missing sources are not silently replaced with zero values.",
          ],
        },
        {
          title: "Horizon-specific models",
          paragraphs: [
            "The 24-hour, 7-day, and 30-day tasks capture different market dynamics. For each horizon, the system compares a specialist model, a technical baseline, and a calibrated probability layer. A more complex model may become active only after proving an advantage on untouched holdout data.",
          ],
        },
        {
          title: "Backtesting",
          paragraphs: [
            "Performance is evaluated with chronological walk-forward splits. Core metrics include directional accuracy, MAE, Brier score, ROC AUC, calibration error, and empirical interval coverage. Production forecasts and experimental challenger results are reported separately.",
          ],
        },
        {
          title: "Limitations",
          paragraphs: [
            "Crypto-market regime shifts, liquidity shocks, and external events can differ materially from historical samples. Probabilities are estimates rather than guaranteed outcomes and are not personalized investment recommendations.",
          ],
        },
      ],
    },
    privacy: {
      eyebrow: "Legal information",
      title: "Privacy notice",
      lead:
        "Core dashboard features work without registration; optional analytics and advertising services start only after a separate choice.",
      sections: [
        { title: "Data controller", kind: "controller", paragraphs: [] },
        {
          title: "Data processed",
          paragraphs: [
            "Required local storage preserves theme and language selections and the consent decision. If enabled, the selected analytics or advertising provider may process technical, device, and usage data under its own notice.",
          ],
        },
        {
          title: "Purpose and retention",
          paragraphs: [
            "Optional analytics helps identify errors and usability issues. Advertising data processing supports the operation of the interface. The exact list of providers, legal bases, and retention periods must be updated together with any activated services.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "Consent can be withdrawn at any time through the privacy settings in the dashboard footer. Data-subject requests may be submitted through the operator's published contact address.",
          ],
        },
      ],
      contact: "Contact",
      contactPending:
        "Operator contact details will be published before commercial launch.",
    },
    cookies: {
      eyebrow: "Privacy",
      title: "Cookie and local storage notice",
      lead:
        "Required features always work; analytics and advertising can be enabled separately and withdrawn later.",
      sections: [
        {
          title: "Required storage",
          paragraphs: [
            "cryptovision-theme stores the light or dark theme, cryptovision-language stores the selected language, and cryptovision-consent-v1 stores the privacy choice in the browser's local storage. Without these entries, selected settings cannot be retained.",
          ],
        },
        {
          title: "Usage analytics",
          paragraphs: [
            "Analytics is disabled by default. When enabled, only a named and documented analytics service may load. The production provider list must be published on this page before integration.",
          ],
        },
        {
          title: "Advertising",
          paragraphs: [
            "Google AdSense code loads only after advertising consent and with a valid publisher identifier. For EEA traffic, a Google-certified, IAB TCF-compatible consent manager must also be configured before AdSense is activated.",
          ],
        },
        {
          title: "Changing settings",
          paragraphs: [
            "The Privacy settings button in the dashboard footer can be used to modify or reject each optional category separately.",
          ],
        },
      ],
    },
    terms: {
      eyebrow: "Legal information",
      title: "Terms of use",
      lead:
        "CryptoVision is a market research and information tool, not a trading service.",
      sections: [
        {
          title: "Nature of the service",
          paragraphs: [
            "Displayed prices, news, probabilities, and model signals provide general information. They are not personalized investment advice, offers, or invitations to trade.",
          ],
        },
        {
          title: "Risk",
          paragraphs: [
            "Crypto assets can fluctuate sharply and may result in partial or total loss. Historical backtests do not guarantee future results, and a forecast interval is not a guaranteed price boundary.",
          ],
        },
        {
          title: "Data quality and availability",
          paragraphs: [
            "External data sources may be delayed, interrupted, or return incorrect values. The interface reports freshness and missing data but does not guarantee uninterrupted, error-free availability.",
          ],
        },
        {
          title: "Advertising and partnerships",
          paragraphs: [
            "Paid placements and partner links are clearly identified. An advertiser's presence cannot alter a forecast or its measured historical performance.",
          ],
        },
      ],
    },
  },
};

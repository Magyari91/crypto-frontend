const englishText = {
  "Trendelő piac": "Trending market",
  "Oldalazó piac": "Range-bound market",
  "Magas volatilitás": "High-volatility market",
  Alacsony: "Low",
  Közepes: "Medium",
  Magas: "High",
  "Visszamért jelminőség": "Backtested signal quality",
  "HOLD - modell tartalékban": "HOLD - model on standby",
  "BUY-jelölt": "BUY candidate",
  Kivárás: "Wait",
  HOLD: "HOLD",
  "A kalibrált ensemble jobb volt a semleges alapmodellnél":
    "The calibrated ensemble outperformed the neutral baseline",
  "A semleges alapmodell kapta a legnagyobb súlyt":
    "The neutral baseline received the highest weight",
  "A forgalmi megerősítéshez nincs elegendő adat":
    "There is not enough data for volume confirmation",
  "A futures funding jellemző még nem érhető el":
    "The futures funding feature is not available yet",
  "A futures adatforrás átmenetileg nem érhető el.":
    "The futures data source is temporarily unavailable.",
  "A kalibrált modell az érintetlen holdouton és legalább két időblokkban felülteljesítette a historikus alapesélyt.":
    "The calibrated model outperformed the historical baseline on the untouched holdout and in at least two time blocks.",
  "A validáció szerint a historikus alapesély volt a legpontosabb.":
    "The historical baseline was most accurate in validation.",
  "A Brier-előny nem érte el a bekapcsolási küszöböt az érintetlen holdouton.":
    "Brier skill did not reach the activation threshold on the untouched holdout.",
  "A modell log loss értéke rosszabb volt a historikus alapesélynél.":
    "The model log loss was worse than the historical baseline.",
  "A becsült százalékok kalibrációs hibája túl nagy volt.":
    "The estimated probabilities had excessive calibration error.",
  "A valószínűségi modell nem volt stabil több időrendi blokkban.":
    "The probability model was not stable across multiple chronological blocks.",
  "A modell rangsorolási képessége még nem volt megfelelő.":
    "The model's ranking performance is not sufficient yet.",
  "A holdout jellemzőeloszlása túl messze került a tanítási időszaktól.":
    "The holdout feature distribution drifted too far from the training period.",
  "A holdout egyik eseményosztályából még túl kevés minta áll rendelkezésre.":
    "One holdout event class still has too few samples.",
  "Az aktuális holdout megfelelt, de a modell a korábbi teljes kapuvizsgálatokon még nem volt stabil.":
    "The current holdout passed, but the model was not yet stable in earlier full gate checks.",
  "A célváltozó csak egy osztályt tartalmaz; valószínűségi modell nem tanítható.":
    "The target contains only one class, so a probability model cannot be trained.",
  "Nincs elég minta a megtisztított négy időrendi adatszakaszhoz.":
    "There are not enough samples for the four purged chronological segments.",
  "Az egyik időrendi adatszakaszban nincs mindkét kimeneti osztály.":
    "One chronological segment does not contain both outcome classes.",
  "Egyik modelljelölt sem volt kiértékelhető.":
    "None of the model candidates could be evaluated.",
  "A validáció szerint a semleges becslés volt pontosabb.":
    "The neutral estimate was more accurate in validation.",
  "Egyik modelljelölt sem javított a validációs alapmodellen.":
    "None of the model candidates improved on the validation baseline.",
  "A validációs győztes holdout-előnye még nem érte el a bekapcsolási küszöböt.":
    "The validation winner's holdout skill has not reached the activation threshold.",
  "A specialista még túl kevés aktív jelzést adott.":
    "The specialist has produced too few active signals so far.",
  "Az aktív irányjelzések találati aránya még nem megfelelő.":
    "The active directional signals are not accurate enough yet.",
  "Nincs elég régi minta a háromrészes validációhoz.":
    "There are not enough older samples for three-part validation.",
  "Az első pont-időbeli feature minták gyűjtése folyamatban van.":
    "The first point-in-time feature samples are being collected.",
  "A pont-időbeli adatkészlet elérte a tanítási minimumot; a jelölt modell külön holdout ellenőrzésre bocsátható.":
    "The point-in-time dataset reached the training minimum; the candidate can proceed to a separate holdout check.",
  "A minták az újraindításkor elvesznek. Tartós PostgreSQL szükséges az élő modell tanításához.":
    "Samples are lost on restart. Persistent PostgreSQL is required to train the live model.",
  "Az órás specialista a purged holdouton igazolt előnyt mutatott.":
    "The hourly specialist showed verified skill on the purged holdout.",
  "Az órás validáció szerint a semleges becslés volt pontosabb.":
    "The neutral estimate was more accurate in hourly validation.",
  "Az órás modell holdout-előnye még nem érte el a küszöböt.":
    "The hourly model's holdout skill has not reached the threshold.",
  "Az órás modell még túl kevés aktív jelzést adott.":
    "The hourly model has produced too few active signals so far.",
  "Az órás modell iránytalálati aránya még nem megfelelő.":
    "The hourly model's directional accuracy is not sufficient yet.",
  "Nincs elég minta a purged validációs felosztáshoz.":
    "There are not enough samples for the purged validation split.",
  "Az órás kvantilismodell a tisztított holdouton javította a mozgási sávot.":
    "The hourly quantile model improved the movement range on the purged holdout.",
  "Az órás kockázati modell nem volt stabil több időrendi blokkon.":
    "The hourly risk model was not stable across multiple chronological blocks.",
  "Az órás kockázati modell még nem verte meg a historikus sávot.":
    "The hourly risk model has not outperformed the historical range yet.",
  "Az órás kockázati modell lefedettsége még nincs a célzónában.":
    "The hourly risk model's coverage is not yet within the target range.",
  "Nincs elég lezárt órás minta a kockázati modellhez.":
    "There are not enough closed hourly samples for the risk model.",
  "Nincs elég minta a tisztított kockázati holdouthoz.":
    "There are not enough samples for the purged risk holdout.",
  "Kalibrált Logistic Regression": "Calibrated logistic regression",
  "Kalibrált temporális Extra Trees": "Calibrated temporal Extra Trees",
  "Kalibrált HistGradientBoosting": "Calibrated HistGradientBoosting",
  "Huber regresszió": "Huber regression",
  "Ridge regresszió": "Ridge regression",
  "Regularizált Extra Trees": "Regularized Extra Trees",
  "Órás Huber regresszió": "Hourly Huber regression",
  "Órás Ridge regresszió": "Hourly Ridge regression",
  "Órás Huber Gradient Boosting": "Hourly Huber Gradient Boosting",
  "80%-os Gradient Boosting kvantilismodell": "80% Gradient Boosting quantile model",
  "Csak a valóban publikált, lejárt előrejelzések kerülnek be. A MAE-t a változatlan árat feltételező alapmodellel, a valószínűséget Brier-score alapján hasonlítjuk össze.":
    "Only genuinely published, expired forecasts are included. MAE is compared with an unchanged-price baseline and probabilities with the Brier score.",
  "Minden tesztpont csak az addig elérhető adatokat használja. A horizont-specialista és a kalibrált valószínűségi modell időszakosan újratanul; egyik sem kapcsol be elkülönített holdouton és időbeli stabilitási kapun mért előny nélkül. A valószínűségi összehasonlítás alapja az adott időpontban ismert historikus eseményarány.":
    "Each test point uses only data available at that time. The horizon specialist and calibrated probability model retrain periodically; neither activates without measured skill on a separate holdout and a temporal stability gate. Probability comparisons use the historical event rate known at that time.",
  "A jelöltek csak lezárt órás gyertyákon tanulnak. A tanító-, validációs és holdout-határok körül a teljes előrejelzési horizont kimarad, a kockázati modell pedig három korábbi időblokkon is stabil előnyt követel.":
    "Candidates train only on closed hourly candles. The full forecast horizon is excluded around training, validation, and holdout boundaries, and the risk model must show stable skill across three earlier time blocks.",
};

const englishFeatureLabels = {
  return_1d: "1-day return",
  return_3d: "3-day momentum",
  return_7d: "7-day momentum",
  return_14d: "14-day momentum",
  return_30d: "30-day momentum",
  return_60d: "60-day momentum",
  lag_return_2d: "Daily return lagged by 2 days",
  lag_return_3d: "Daily return lagged by 3 days",
  lag_return_4d: "Daily return lagged by 4 days",
  lag_return_5d: "Daily return lagged by 5 days",
  lag_return_6d: "Daily return lagged by 6 days",
  lag_return_7d: "Daily return lagged by 7 days",
  volatility_7d: "7-day volatility",
  volatility_30d: "30-day volatility",
  downside_volatility_30d: "Downside return volatility",
  slope_20d: "20-day trend slope",
  slope_60d: "60-day trend slope",
  ema_5_20: "EMA 5/20 spread",
  ema_20_50: "EMA 20/50 trend",
  price_sma200: "Price/SMA200 trend",
  rsi_14: "RSI (14)",
  price_zscore_20: "20-day price deviation",
  drawdown_30d: "30-day drawdown",
  volume_ratio_7_30: "Short/long-term volume",
  volume_zscore_20: "Volume z-score",
  volume_change_7d: "7-day volume change",
  volume_available: "Volume data completeness",
  market_return_7d: "BTC 7-day trend",
  market_return_30d: "BTC 30-day trend",
  market_ema_20_50: "BTC EMA 20/50 trend",
  market_price_sma200: "BTC price/SMA200 trend",
  relative_strength_7d: "7-day relative strength",
  relative_strength_30d: "30-day relative strength",
  funding_rate_1d: "Current funding rate",
  funding_rate_7d: "7-day average funding",
  funding_rate_30d: "30-day average funding",
  funding_zscore_30d: "Funding-rate z-score",
  funding_available: "Funding data completeness",
};

const englishPatterns = [
  [/^P\((\d+) napos hozam >= \+(.+)%\)$/, (days, target) => `P(${days}-day return >= +${target}%)`],
  [/^Annak esélye, hogy a (\d+) napos hozam eléri a \+(.+)%-ot$/, (days, target) => `Probability that the ${days}-day return reaches +${target}%`],
  [/^(\d+) napos küszöbhozam-valószínűség$/, (days) => `${days}-day threshold-return probability`],
  [/^(\d+) napos modellverseny$/, (days) => `${days}-day model competition`],
  [/^Órás (\d+) napos specialista$/, (days) => `Hourly ${days}-day specialist`],
  [/^(\d+) napos órás mozgási sáv$/, (days) => `${days}-day hourly movement range`],
  [/^Még legalább (\d+) lezárt órás tanítóminta szükséges\.$/, (count) => `At least ${count} closed hourly training samples are still required.`],
  [/^Még legalább (\d+) lezárt tanítóminta szükséges\.$/, (count) => `At least ${count} closed training samples are still required.`],
  [/^(\d+) lejárt minta vár kimeneti árra; a következő collector futás címkézi őket\.$/, (count) => `${count} expired samples are awaiting outcome prices; the next collector run will label them.`],
  [/^A minták gyűlnek, az első (\d+) napos kimenetelek még nem jártak le\.$/, (days) => `Samples are accumulating; the first ${days}-day outcomes have not expired yet.`],
  [/^Még (\d+) független, lezárt nap szükséges a tanítási kapuhoz\.$/, (count) => `${count} more independent closed days are required by the training gate.`],
  [/^A (.+) nyerte a validációs versenyt, majd a külön holdouton is felülteljesítette a semleges alapmodellt\.$/, (family) => `${translateApiText(family, "en")} won the validation competition and also outperformed the neutral baseline on the separate holdout.`],
  [/^A rövid távú forgalom a 30 napos átlag (.+)-szerese$/, (ratio) => `Short-term volume is ${ratio} times the 30-day average`],
  [/^A legutóbbi napi funding átlag (.+)%$/, (value) => `The latest daily average funding rate is ${value}%`],
  [/^Valószínűségi kapu: (.+)$/, (reason) => `Probability gate: ${translateApiText(reason, "en")}`],
  [/^Döntési kapu: (.+)$/, (decision) => `Decision gate: ${translateApiText(decision, "en")}`],
];

export function translateApiText(value, language) {
  if (language !== "en" || typeof value !== "string" || !value) return value;
  if (englishText[value]) return englishText[value];

  for (const [pattern, translate] of englishPatterns) {
    const match = value.match(pattern);
    if (match) return translate(...match.slice(1));
  }

  return value;
}

export function translateFeatureLabel(feature, language) {
  if (language !== "en") return feature?.label;
  return englishFeatureLabels[feature?.key] || translateApiText(feature?.label, language);
}

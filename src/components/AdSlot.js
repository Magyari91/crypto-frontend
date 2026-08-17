"use client";

import React, { useEffect } from "react";
import { useConsent } from "./ConsentManager";

const slots = {
  dashboard: process.env.NEXT_PUBLIC_ADSENSE_SLOT_DASHBOARD,
  market: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MARKET,
};

function requestAd() {
  try {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  } catch (_error) {
    // Ad blockers and restrictive browsers can intentionally reject the request.
  }
}

export default function AdSlot({ placement }) {
  const consent = useConsent();
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const certifiedCmpReady = process.env.NEXT_PUBLIC_ADSENSE_CMP_READY === "true";
  const slot = slots[placement];
  const enabled = certifiedCmpReady && consent.advertising && Boolean(client && slot);

  useEffect(() => {
    if (!enabled) return undefined;

    const scriptId = "cryptovision-adsense";
    const existing = document.getElementById(scriptId);
    if (existing) {
      requestAd();
      return undefined;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
    script.addEventListener("load", requestAd, { once: true });
    document.head.appendChild(script);

    return () => script.removeEventListener("load", requestAd);
  }, [client, enabled]);

  if (!enabled) return null;

  return (
    <aside className="ad-slot" aria-label="Hirdetés">
      <span>Hirdetés</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

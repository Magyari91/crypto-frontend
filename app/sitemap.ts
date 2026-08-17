import type { MetadataRoute } from "next";
import { ANALYZED_COINS } from "../src/config/coins";
import { SITE_URL } from "../src/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/market", "/news", "/models", "/methodology", "/about"];
  const legalRoutes = ["/privacy", "/cookies", "/terms"];

  return [
    ...staticRoutes.map((path, index) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: index === 0 ? ("daily" as const) : ("weekly" as const),
      priority: index === 0 ? 1 : 0.8,
    })),
    ...ANALYZED_COINS.map((coin) => ({
      url: `${SITE_URL}/forecast/${coin.id}`,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    ...legalRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}

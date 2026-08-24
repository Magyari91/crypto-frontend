const DASHBOARD_CACHE_PREFIX = "cryptovision-dashboard-v1";

export const DASHBOARD_CACHE_MAX_AGE_MS = 6 * 60 * 60 * 1000;

export function dashboardCacheKey(coin, horizon) {
  return `${DASHBOARD_CACHE_PREFIX}:${coin}:${horizon}`;
}

function matchesRequest(payload, coin, horizon) {
  return (
    payload?.selected?.id === coin &&
    Number(payload?.selected?.forecast?.horizon_days) === Number(horizon)
  );
}

export function readDashboardCache(
  coin,
  horizon,
  maxAgeMs = DASHBOARD_CACHE_MAX_AGE_MS
) {
  if (typeof window === "undefined") return null;

  try {
    const serialized = window.localStorage.getItem(dashboardCacheKey(coin, horizon));
    if (!serialized) return null;
    const entry = JSON.parse(serialized);
    const ageMs = Date.now() - Number(entry.cachedAt);
    if (
      !Number.isFinite(ageMs) ||
      ageMs < 0 ||
      ageMs > maxAgeMs ||
      !matchesRequest(entry.payload, coin, horizon)
    ) {
      window.localStorage.removeItem(dashboardCacheKey(coin, horizon));
      return null;
    }
    return entry.payload;
  } catch (_error) {
    return null;
  }
}

export function writeDashboardCache(payload) {
  if (typeof window === "undefined") return;

  const coin = payload?.selected?.id;
  const horizon = payload?.selected?.forecast?.horizon_days;
  if (!coin || !Number.isFinite(Number(horizon))) return;

  try {
    window.localStorage.setItem(
      dashboardCacheKey(coin, horizon),
      JSON.stringify({ cachedAt: Date.now(), payload })
    );
  } catch (_error) {
    // Storage can be unavailable in strict privacy modes; live loading still works.
  }
}

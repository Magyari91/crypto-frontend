import {
  dashboardCacheKey,
  readDashboardCache,
  writeDashboardCache,
} from "./dashboardCache";

function dashboardPayload(coin = "bitcoin", horizon = 7) {
  return {
    generated_at: "2026-08-24T00:12:00+00:00",
    selected: {
      id: coin,
      forecast: { horizon_days: horizon },
    },
  };
}

beforeEach(() => {
  window.localStorage.clear();
  jest.restoreAllMocks();
});

test("restores a matching dashboard payload", () => {
  jest.spyOn(Date, "now").mockReturnValue(1_000_000);
  const payload = dashboardPayload();

  writeDashboardCache(payload);

  expect(readDashboardCache("bitcoin", 7)).toEqual(payload);
});

test("removes expired or mismatched dashboard payloads", () => {
  jest.spyOn(Date, "now").mockReturnValue(2_000_000);
  const key = dashboardCacheKey("bitcoin", 7);
  window.localStorage.setItem(
    key,
    JSON.stringify({ cachedAt: 1_000_000, payload: dashboardPayload("ethereum", 7) })
  );

  expect(readDashboardCache("bitcoin", 7, 10_000)).toBeNull();
  expect(window.localStorage.getItem(key)).toBeNull();
});

test("ignores malformed storage without breaking live loading", () => {
  window.localStorage.setItem(dashboardCacheKey("bitcoin", 7), "not-json");

  expect(readDashboardCache("bitcoin", 7)).toBeNull();
});

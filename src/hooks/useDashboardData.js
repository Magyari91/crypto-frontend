import { useCallback, useEffect, useState } from "react";
import { fetchDashboard } from "../services/api";
import { useLanguage } from "../i18n/LanguageContext";
import { readDashboardCache, writeDashboardCache } from "../utils/dashboardCache";

const MAX_REFRESH_POLLS = 8;

function refreshDelay(payload) {
  const seconds = Number(payload?.delivery?.retry_after_seconds) || 3;
  return Math.min(5, Math.max(2, seconds)) * 1000;
}

export function useDashboardData(coin, horizon) {
  const { copy } = useLanguage();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [requestVersion, setRequestVersion] = useState(0);

  const refresh = useCallback(() => {
    setRequestVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const cached = readDashboardCache(coin, horizon);
    const isInitialLoad = data === null && cached === null;

    if (cached) {
      setData(cached);
      setLoading(false);
      setRefreshing(true);
    } else if (isInitialLoad) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }
    setError("");

    async function load() {
      let payload = await fetchDashboard({
        coin,
        horizon,
        signal: controller.signal,
        errorMessages: copy.states,
      });

      for (let attempt = 0; ; attempt += 1) {
        if (controller.signal.aborted) return;
        setData(payload);
        writeDashboardCache(payload);

        if (!payload?.delivery?.refreshing || attempt >= MAX_REFRESH_POLLS) return;
        await new Promise((resolve) => setTimeout(resolve, refreshDelay(payload)));
        if (controller.signal.aborted) return;
        payload = await fetchDashboard({
          coin,
          horizon,
          signal: controller.signal,
          errorMessages: copy.states,
        });
      }
    }

    load()
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError(
            requestError.message || copy.states.marketLoadError
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
          setRefreshing(false);
        }
      });

    return () => controller.abort();
    // Keeping the current data visible during a refresh is intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin, horizon, requestVersion]);

  return { data, error, loading, refreshing, refresh };
}

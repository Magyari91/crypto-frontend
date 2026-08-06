import { useCallback, useEffect, useState } from "react";
import { fetchForecastAnalytics } from "../services/api";

export function useForecastAnalytics(coin, horizon, dashboardVersion) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestVersion, setRequestVersion] = useState(0);

  const refresh = useCallback(() => {
    setRequestVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    if (!dashboardVersion) return undefined;

    const controller = new AbortController();
    setLoading(true);
    setError("");

    fetchForecastAnalytics({ coin, horizon, signal: controller.signal })
      .then((payload) => setData(payload))
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError(requestError.message || "A modell visszamérése most nem érhető el.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [coin, dashboardVersion, horizon, requestVersion]);

  return { data, error, loading, refresh };
}

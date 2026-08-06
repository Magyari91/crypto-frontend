import { useCallback, useEffect, useState } from "react";
import { fetchDashboard } from "../services/api";

export function useDashboardData(coin, horizon) {
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
    const isInitialLoad = data === null;

    if (isInitialLoad) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }
    setError("");

    fetchDashboard({ coin, horizon, signal: controller.signal })
      .then((payload) => setData(payload))
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError(
            requestError.message ||
              "Nem sikerült betölteni a piaci adatokat. Próbáld újra rövidesen."
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

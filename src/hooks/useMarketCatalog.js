import { useCallback, useEffect, useState } from "react";
import { fetchMarketCatalog } from "../services/api";


export function useMarketCatalog(enabled = true) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [requestVersion, setRequestVersion] = useState(0);

  const refresh = useCallback(() => {
    setRequestVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const controller = new AbortController();
    if (data === null) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }
    setError("");

    fetchMarketCatalog({ limit: 200, signal: controller.signal })
      .then((payload) => setData(payload))
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError(
            requestError.message ||
              "A teljes piaclista most nem tölthető be."
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
    // Keep the last successful catalog visible during refreshes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, requestVersion]);

  return { data, error, loading, refreshing, refresh };
}

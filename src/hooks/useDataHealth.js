import { useCallback, useEffect, useState } from "react";
import { fetchDataHealth } from "../services/api";
import { useLanguage } from "../i18n/LanguageContext";


export function useDataHealth(enabled = true) {
  const { copy } = useLanguage();
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

    fetchDataHealth({ signal: controller.signal, errorMessages: copy.states })
      .then((payload) => setData(payload))
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError(requestError.message || copy.states.dataHealthError);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
          setRefreshing(false);
        }
      });

    return () => controller.abort();
    // Keep the last successful status visible during refreshes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, requestVersion]);

  return { data, error, loading, refreshing, refresh };
}

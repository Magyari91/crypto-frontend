import { useCallback, useEffect, useState } from "react";
import { fetchForecastAnalytics } from "../services/api";

function waitForRetry(milliseconds, signal) {
  return new Promise((resolve, reject) => {
    let timeout;
    const onAbort = () => {
      window.clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    };
    timeout = window.setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, milliseconds);
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

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

    const loadAnalytics = async () => {
      while (!controller.signal.aborted) {
        const payload = await fetchForecastAnalytics({
          coin,
          horizon,
          signal: controller.signal,
        });
        if (payload.status !== "pending") {
          setData(payload);
          return;
        }
        const retrySeconds = Math.max(2, Number(payload.retry_after_seconds) || 5);
        await waitForRetry(retrySeconds * 1000, controller.signal);
      }
    };

    loadAnalytics()
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

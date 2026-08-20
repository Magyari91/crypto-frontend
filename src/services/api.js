const DEFAULT_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://crypto-backend-pv99.onrender.com";

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL
).replace(/\/$/, "");

async function parseError(response, errorMessages = {}) {
  try {
    const payload = await response.json();
    return payload.detail || errorMessages.serverError || "The server could not process the request.";
  } catch (_error) {
    return errorMessages.serverUnavailable || "The server is temporarily unavailable.";
  }
}

export async function fetchDashboard({ coin, horizon, signal, errorMessages }) {
  const query = new URLSearchParams({
    coin,
    horizon: String(horizon),
  });
  const response = await fetch(`${API_BASE_URL}/api/v1/dashboard?${query}`, {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(await parseError(response, errorMessages));
  }

  return response.json();
}

export async function fetchMarketCatalog({ limit = 200, signal, errorMessages }) {
  const query = new URLSearchParams({ limit: String(limit) });
  const response = await fetch(`${API_BASE_URL}/api/v1/markets?${query}`, {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(await parseError(response, errorMessages));
  }

  return response.json();
}

export async function fetchForecastAnalytics({ coin, horizon, signal, errorMessages }) {
  const query = new URLSearchParams({
    coin,
    horizon: String(horizon),
  });
  const response = await fetch(`${API_BASE_URL}/api/v1/forecast/analytics?${query}`, {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(await parseError(response, errorMessages));
  }

  return response.json();
}

export async function fetchDataHealth({ signal, errorMessages }) {
  const response = await fetch(`${API_BASE_URL}/api/v1/forecast/data-health`, {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(await parseError(response, errorMessages));
  }

  return response.json();
}

export async function fetchModelLab({ coin, horizon, signal, errorMessages }) {
  const query = new URLSearchParams({
    coin,
    horizon: String(horizon),
  });
  const response = await fetch(`${API_BASE_URL}/api/v1/forecast/lab?${query}`, {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(await parseError(response, errorMessages));
  }

  return response.json();
}

import React, { useEffect, useMemo, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import DashboardControls from "./components/dashboard/DashboardControls";
import { ErrorState, LoadingDashboard } from "./components/dashboard/DashboardStates";
import DerivativesMetrics from "./components/dashboard/DerivativesMetrics";
import ForecastSummary from "./components/dashboard/ForecastSummary";
import ForecastAnalytics from "./components/dashboard/ForecastAnalytics";
import MarketMetrics from "./components/dashboard/MarketMetrics";
import MarketTable from "./components/dashboard/MarketTable";
import MoversPanel from "./components/dashboard/MoversPanel";
import NewsPanel from "./components/dashboard/NewsPanel";
import PriceChart from "./components/dashboard/PriceChart";
import RiskSignals from "./components/dashboard/RiskSignals";
import Sidebar from "./components/dashboard/Sidebar";
import { useDashboardData } from "./hooks/useDashboardData";
import { useForecastAnalytics } from "./hooks/useForecastAnalytics";

function initialTheme() {
  const saved = window.localStorage.getItem("cryptovision-theme");
  if (saved === "light" || saved === "dark") return saved;
  if (window.matchMedia?.("(prefers-color-scheme: light)").matches) return "light";
  return "dark";
}

function DashboardContent({ data, risk, selectedCoin, analytics }) {
  return (
    <>
      <MarketMetrics market={data.market} />
      <ForecastSummary selected={data.selected} generatedAt={data.generated_at} />
      <DerivativesMetrics data={data.derivatives} />

      <div className="analysis-grid">
        <PriceChart selected={data.selected} />
        <RiskSignals forecast={data.selected.forecast} risk={risk} />
      </div>

      <ForecastAnalytics
        data={analytics.data}
        loading={analytics.loading}
        error={analytics.error}
        onRetry={analytics.refresh}
      />

      <div className="market-grid">
        <MarketTable rows={data.watchlist} selectedCoin={selectedCoin} />
        <MoversPanel movers={data.movers} />
      </div>

      <NewsPanel articles={data.news || []} />
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [coin, setCoin] = useState("bitcoin");
  const [horizon, setHorizon] = useState(7);
  const [risk, setRisk] = useState(5);
  const { data, error, loading, refreshing, refresh } = useDashboardData(coin, horizon);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("cryptovision-theme", theme);
  }, [theme]);

  const matchingData = useMemo(() => {
    if (!data) return null;
    const forecastHorizon = data.selected?.forecast?.horizon_days;
    return data.selected?.id === coin && forecastHorizon === horizon ? data : null;
  }, [coin, data, horizon]);

  const analytics = useForecastAnalytics(coin, horizon, matchingData?.generated_at);
  const matchingAnalytics = useMemo(() => {
    if (!analytics.data) return null;
    return analytics.data.asset?.id === coin && analytics.data.horizon_days === horizon
      ? analytics.data
      : null;
  }, [analytics.data, coin, horizon]);

  const online = Boolean(data) && !error;
  const pageLoading = loading || (!matchingData && refreshing);

  return (
    <div className="application-shell">
      <Sidebar online={online} loading={loading && !data} />

      <div className="workspace">
        <header className="topbar" id="overview">
          <div>
            <span className="eyebrow">Kriptopiaci irányítópult</span>
            <h1>Piaci állapot és rövid távú modellnézet</h1>
          </div>
          <div className="topbar-actions">
            <span className={`live-status ${online ? "online" : ""}`}>
              <i />
              {online ? "Élő piaci adatok" : "Kapcsolat ellenőrzése"}
            </span>
            <button
              type="button"
              className="icon-button"
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
              aria-label={theme === "dark" ? "Világos téma" : "Sötét téma"}
              title={theme === "dark" ? "Világos téma" : "Sötét téma"}
            >
              {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
            </button>
          </div>
        </header>

        <main className="dashboard-main">
          <DashboardControls
            coin={coin}
            onCoinChange={setCoin}
            horizon={horizon}
            onHorizonChange={setHorizon}
            risk={risk}
            onRiskChange={setRisk}
            supportedCoins={data?.supported_coins}
            refreshing={refreshing}
            onRefresh={refresh}
          />

          {error && data && (
            <div className="data-warning" role="status">
              A frissítés nem sikerült, ezért az utolsó elérhető adatokat látod. {error}
            </div>
          )}

          {pageLoading && !matchingData && <LoadingDashboard />}
          {!pageLoading && error && !data && <ErrorState message={error} onRetry={refresh} />}
          {matchingData && (
            <DashboardContent
              data={matchingData}
              risk={risk}
              selectedCoin={coin}
              analytics={{ ...analytics, data: matchingAnalytics }}
            />
          )}

          <footer className="dashboard-footer">
            <span>
              CryptoVision · {matchingData?.selected?.forecast?.model || "Kalibrált előrejelző modell"}
            </span>
            <span>Kísérleti elemzés, nem pénzügyi tanács.</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;

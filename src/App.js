"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import AdSlot from "./components/AdSlot";
import LanguageSwitcher from "./components/LanguageSwitcher";
import DashboardControls from "./components/dashboard/DashboardControls";
import DataHealthPanel from "./components/dashboard/DataHealthPanel";
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
import { useDataHealth } from "./hooks/useDataHealth";
import { useForecastAnalytics } from "./hooks/useForecastAnalytics";
import { useMarketCatalog } from "./hooks/useMarketCatalog";
import { useLanguage } from "./i18n/LanguageContext";

function initialTheme() {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("cryptovision-theme");
  if (saved === "light" || saved === "dark") return saved;
  if (window.matchMedia?.("(prefers-color-scheme: light)").matches) return "light";
  return "dark";
}

function DashboardContent({
  data,
  risk,
  selectedCoin,
  analytics,
  marketCatalog,
  onAnalyze,
  view,
}) {
  const showForecast = ["dashboard", "forecast", "models"].includes(view);
  const showForecastContext = ["dashboard", "forecast"].includes(view);
  const showMarket = ["dashboard", "market"].includes(view);
  const showNews = ["dashboard", "forecast", "news"].includes(view);

  return (
    <>
      <MarketMetrics market={data.market} />
      {view === "dashboard" && <AdSlot placement="dashboard" />}
      {showForecast && (
        <ForecastSummary selected={data.selected} generatedAt={data.generated_at} />
      )}
      {showForecastContext && <DerivativesMetrics data={data.derivatives} />}

      {showForecastContext && (
        <div className="analysis-grid">
          <PriceChart selected={data.selected} />
          <RiskSignals forecast={data.selected.forecast} risk={risk} />
        </div>
      )}

      {showForecast && (
        <ForecastAnalytics
          data={analytics.data}
          loading={analytics.loading}
          error={analytics.error}
          onRetry={analytics.refresh}
        />
      )}

      {showMarket && (
        <MarketTable
          catalog={marketCatalog.data}
          fallbackRows={data.watchlist}
          selectedCoin={selectedCoin}
          loading={marketCatalog.loading}
          refreshing={marketCatalog.refreshing}
          error={marketCatalog.error}
          onRetry={marketCatalog.refresh}
          onAnalyze={onAnalyze}
        />
      )}
      {view === "market" && <AdSlot placement="market" />}
      {showMarket && <MoversPanel movers={data.movers} />}

      {showNews && (
        <NewsPanel
          articles={data.news || []}
          sentiment={data.news_sentiment}
          asset={data.selected}
        />
      )}
    </>
  );
}

function App({
  initialCoin = "bitcoin",
  view = "dashboard",
  pageEyebrow,
  pageTitle,
  pageDescription,
  onCoinNavigate,
  onOpenAnalysis,
}) {
  const { copy } = useLanguage();
  const defaultPageCopy = copy.pages[view] || copy.pages.dashboard;
  const resolvedPageEyebrow = pageEyebrow || defaultPageCopy.eyebrow;
  const resolvedPageTitle = pageTitle || defaultPageCopy.title;
  const resolvedPageDescription = pageDescription || defaultPageCopy.description;
  const [theme, setTheme] = useState("dark");
  const themeReady = useRef(false);
  const [coin, setCoin] = useState(initialCoin);
  const [horizon, setHorizon] = useState(7);
  const [risk, setRisk] = useState(5);
  const [pendingAnalysisCoin, setPendingAnalysisCoin] = useState(null);
  const { data, error, loading, refreshing, refresh } = useDashboardData(coin, horizon);

  useEffect(() => {
    setCoin(initialCoin);
  }, [initialCoin]);

  useEffect(() => {
    const preferredTheme = initialTheme();
    themeReady.current = true;
    document.documentElement.dataset.theme = preferredTheme;
    setTheme(preferredTheme);
  }, []);

  useEffect(() => {
    if (!themeReady.current) return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("cryptovision-theme", theme);
  }, [theme]);

  const matchingData = useMemo(() => {
    if (!data) return null;
    const forecastHorizon = data.selected?.forecast?.horizon_days;
    return data.selected?.id === coin && forecastHorizon === horizon ? data : null;
  }, [coin, data, horizon]);

  const needsAnalytics = ["dashboard", "forecast", "models"].includes(view);
  const needsMarketCatalog = ["dashboard", "market"].includes(view);
  const dataHealth = useDataHealth(view === "models");
  const analytics = useForecastAnalytics(
    coin,
    horizon,
    matchingData?.generated_at,
    needsAnalytics
  );
  const matchingAnalytics = useMemo(() => {
    if (!analytics.data) return null;
    return analytics.data.asset?.id === coin && analytics.data.horizon_days === horizon
      ? analytics.data
      : null;
  }, [analytics.data, coin, horizon]);
  const marketCatalog = useMarketCatalog(Boolean(matchingData) && needsMarketCatalog);

  useEffect(() => {
    if (!pendingAnalysisCoin || matchingData?.selected?.id !== pendingAnalysisCoin) return;
    document.getElementById("forecast")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setPendingAnalysisCoin(null);
  }, [matchingData, pendingAnalysisCoin]);

  const openAnalysis = (coinId) => {
    if (onOpenAnalysis) {
      onOpenAnalysis(coinId);
      return;
    }
    setPendingAnalysisCoin(coinId);
    setCoin(coinId);
    window.history.replaceState(null, "", "#forecast");
  };

  const changeCoin = (coinId) => {
    setCoin(coinId);
    onCoinNavigate?.(coinId);
  };

  const refreshAll = () => {
    refresh();
    marketCatalog.refresh();
    dataHealth.refresh();
  };

  const online = Boolean(data) && !error;
  const pageLoading = loading || (!matchingData && refreshing);

  return (
    <div className="application-shell">
      <Sidebar
        online={online}
        loading={loading && !data}
        activeView={view}
        coin={coin}
      />

      <div className="workspace">
        <header className="topbar" id="overview">
          <div>
            <span className="eyebrow">{resolvedPageEyebrow}</span>
            <h1>{resolvedPageTitle}</h1>
            <p className="topbar-description">{resolvedPageDescription}</p>
          </div>
          <div className="topbar-actions">
            <span className={`live-status ${online ? "online" : ""}`}>
              <i />
              {online ? copy.app.liveData : copy.app.checkingConnection}
            </span>
            <LanguageSwitcher />
            <button
              type="button"
              className="icon-button"
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
              aria-label={theme === "dark" ? copy.app.lightTheme : copy.app.darkTheme}
              title={theme === "dark" ? copy.app.lightTheme : copy.app.darkTheme}
            >
              {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
            </button>
          </div>
        </header>

        <main className="dashboard-main">
          <DashboardControls
            coin={coin}
            onCoinChange={changeCoin}
            horizon={horizon}
            onHorizonChange={setHorizon}
            risk={risk}
            onRiskChange={setRisk}
            supportedCoins={data?.supported_coins}
            refreshing={refreshing || marketCatalog.refreshing || dataHealth.refreshing}
            onRefresh={refreshAll}
          />

          {view === "models" && (
            <DataHealthPanel {...dataHealth} onRetry={dataHealth.refresh} />
          )}

          {error && data && (
            <div className="data-warning" role="status">
              {copy.app.refreshWarning} {error}
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
              marketCatalog={marketCatalog}
              onAnalyze={openAnalysis}
              view={view}
            />
          )}

          <footer className="dashboard-footer">
            <div>
              <span>
                CryptoVision · {matchingData?.selected?.forecast?.model || copy.app.calibratedModel}
              </span>
              <span>{copy.app.disclaimer}</span>
            </div>
            <nav className="footer-links" aria-label={copy.app.legalNavigation}>
              <a href="/about">{copy.app.about}</a>
              <a href="/methodology">{copy.app.methodology}</a>
              <a href="/privacy">{copy.app.privacy}</a>
              <a href="/cookies">{copy.app.cookies}</a>
              <a href="/terms">{copy.app.terms}</a>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("cryptovision:privacy"))}
              >
                {copy.app.privacySettings}
              </button>
            </nav>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;

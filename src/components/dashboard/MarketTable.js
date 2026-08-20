import React, { useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";
import { formatCompactCurrency, formatPercent, formatPrice } from "../../utils/formatters";
import { useLanguage } from "../../i18n/LanguageContext";

const PAGE_SIZE = 25;

function directionClass(value) {
  if (value == null || !Number.isFinite(Number(value))) return "";
  return Number(value) >= 0 ? "positive" : "negative";
}

function sortRows(rows, sort, locale) {
  const sorted = [...rows];
  if (sort === "gainers") {
    return sorted.sort((a, b) => Number(b.change_24h ?? -Infinity) - Number(a.change_24h ?? -Infinity));
  }
  if (sort === "losers") {
    return sorted.sort((a, b) => Number(a.change_24h ?? Infinity) - Number(b.change_24h ?? Infinity));
  }
  if (sort === "name") {
    return sorted.sort((a, b) => String(a.name).localeCompare(String(b.name), locale));
  }
  return sorted.sort(
    (a, b) => Number(a.market_cap_rank ?? Infinity) - Number(b.market_cap_rank ?? Infinity)
  );
}

function MarketTable({
  catalog,
  fallbackRows = [],
  selectedCoin,
  loading,
  refreshing,
  error,
  onRetry,
  onAnalyze,
}) {
  const { copy, locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("rank");
  const [page, setPage] = useState(1);

  const rows = catalog?.items?.length ? catalog.items : fallbackRows;
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);
  const filteredRows = useMemo(() => {
    const matching = rows.filter((row) => {
      if (filter === "analysis" && !row.analysis_available) return false;
      if (!normalizedQuery) return true;
      return `${row.name || ""} ${row.symbol || ""}`
        .toLocaleLowerCase(locale)
        .includes(normalizedQuery);
    });
    return sortRows(matching, sort, locale);
  }, [filter, locale, normalizedQuery, rows, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visibleRows = filteredRows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const firstVisible = filteredRows.length ? (safePage - 1) * PAGE_SIZE + 1 : 0;
  const lastVisible = Math.min(safePage * PAGE_SIZE, filteredRows.length);
  const source = catalog?.source || "CoinGecko";
  const analysisLimit = catalog?.analysis_limit || 10;

  useEffect(() => {
    setPage(1);
  }, [filter, normalizedQuery, sort]);

  return (
    <section className="surface market-panel" id="market" aria-labelledby="market-title">
      <header className="panel-heading market-heading">
        <div>
          <span>{copy.marketTable.eyebrow}</span>
          <h2 id="market-title">{copy.marketTable.title}</h2>
        </div>
        <small>
          {copy.marketTable.assetCount(catalog?.count || rows.length, analysisLimit)}
        </small>
      </header>

      <div className="market-toolbar" aria-label={copy.marketTable.controls}>
        <label className="market-search">
          <FiSearch aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.marketTable.searchPlaceholder}
            aria-label={copy.marketTable.search}
          />
        </label>

        <div className="market-filter" aria-label={copy.marketTable.filter}>
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            {copy.marketTable.all}
          </button>
          <button
            type="button"
            className={filter === "analysis" ? "active" : ""}
            aria-pressed={filter === "analysis"}
            onClick={() => setFilter("analysis")}
          >
            {copy.marketTable.analyzable}
          </button>
        </div>

        <label className="market-sort">
          <span>{copy.marketTable.sort}</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="rank">{copy.marketTable.marketCap}</option>
            <option value="gainers">{copy.marketTable.gainers}</option>
            <option value="losers">{copy.marketTable.losers}</option>
            <option value="name">{copy.marketTable.name}</option>
          </select>
        </label>

        <div className="market-catalog-state" aria-live="polite">
          {(loading || refreshing) && <FiRefreshCw className="spin" aria-hidden="true" />}
          <span>
            {loading
              ? copy.marketTable.loading
              : catalog?.partial
                ? copy.marketTable.partial
                : copy.marketTable.ranking(source)}
          </span>
        </div>
      </div>

      {error && (
        <div className="market-catalog-warning" role="status">
          <span>{error} {copy.marketTable.fallback}</span>
          <button type="button" onClick={onRetry}>
            <FiRefreshCw aria-hidden="true" />
            {copy.states.retry}
          </button>
        </div>
      )}

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>{copy.marketTable.asset}</th>
              <th>{copy.marketTable.price}</th>
              <th>{copy.marketTable.hours24}</th>
              <th>{copy.marketTable.days7}</th>
              <th>{copy.marketTable.marketCap}</th>
              <th>{copy.marketTable.model}</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr className={row.id === selectedCoin ? "selected-row" : ""} key={row.id}>
                <td>{row.market_cap_rank ?? "-"}</td>
                <td>
                  <div className="coin-cell">
                    {row.image ? (
                      <img src={row.image} alt="" loading="lazy" />
                    ) : (
                      <span className="coin-symbol-avatar" aria-hidden="true">
                        {row.symbol.slice(0, 1)}
                      </span>
                    )}
                    <span>
                      <strong>{row.name}</strong>
                      <small>{row.symbol}</small>
                    </span>
                  </div>
                </td>
                <td>{formatPrice(row.current_price)}</td>
                <td className={directionClass(row.change_24h)}>
                  {formatPercent(row.change_24h, true)}
                </td>
                <td className={directionClass(row.change_7d)}>
                  {formatPercent(row.change_7d, true)}
                </td>
                <td>{formatCompactCurrency(row.market_cap)}</td>
                <td>
                  {row.analysis_available ? (
                    <button
                      type="button"
                      className={`market-analysis-button ${row.id === selectedCoin ? "active" : ""}`}
                      onClick={() => onAnalyze(row.id)}
                      aria-label={copy.marketTable.openAnalysis(row.name)}
                    >
                      <FiActivity aria-hidden="true" />
                      {row.id === selectedCoin ? copy.marketTable.opened : copy.marketTable.analysis}
                    </button>
                  ) : (
                    <span className="price-only">{copy.marketTable.priceOnly}</span>
                  )}
                </td>
              </tr>
            ))}
            {visibleRows.length === 0 && (
              <tr>
                <td className="market-empty" colSpan="7">
                  {copy.marketTable.empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className="market-pagination">
        <span>{firstVisible}–{lastVisible} / {filteredRows.length}</span>
        <strong>{safePage} / {pageCount} {copy.marketTable.page}</strong>
        <div>
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={safePage === 1}
            aria-label={copy.marketTable.previous}
            title={copy.marketTable.previous}
          >
            <FiChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
            disabled={safePage === pageCount}
            aria-label={copy.marketTable.next}
            title={copy.marketTable.next}
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      </footer>
    </section>
  );
}

export default MarketTable;

import React, { useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";
import { formatCompactCurrency, formatPercent, formatPrice } from "../../utils/formatters";

const PAGE_SIZE = 25;

function directionClass(value) {
  if (value == null || !Number.isFinite(Number(value))) return "";
  return Number(value) >= 0 ? "positive" : "negative";
}

function sortRows(rows, sort) {
  const sorted = [...rows];
  if (sort === "gainers") {
    return sorted.sort((a, b) => Number(b.change_24h ?? -Infinity) - Number(a.change_24h ?? -Infinity));
  }
  if (sort === "losers") {
    return sorted.sort((a, b) => Number(a.change_24h ?? Infinity) - Number(b.change_24h ?? Infinity));
  }
  if (sort === "name") {
    return sorted.sort((a, b) => String(a.name).localeCompare(String(b.name), "hu"));
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
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("rank");
  const [page, setPage] = useState(1);

  const rows = catalog?.items?.length ? catalog.items : fallbackRows;
  const normalizedQuery = query.trim().toLocaleLowerCase("hu");
  const filteredRows = useMemo(() => {
    const matching = rows.filter((row) => {
      if (filter === "analysis" && !row.analysis_available) return false;
      if (!normalizedQuery) return true;
      return `${row.name || ""} ${row.symbol || ""}`
        .toLocaleLowerCase("hu")
        .includes(normalizedQuery);
    });
    return sortRows(matching, sort);
  }, [filter, normalizedQuery, rows, sort]);

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
          <span>Piaclista</span>
          <h2 id="market-title">Kriptovaluta árfolyamok</h2>
        </div>
        <small>
          {catalog?.count || rows.length} eszköz · {analysisLimit} elemezhető
        </small>
      </header>

      <div className="market-toolbar" aria-label="Piaclista vezérlők">
        <label className="market-search">
          <FiSearch aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Név vagy ticker"
            aria-label="Piaclista keresése"
          />
        </label>

        <div className="market-filter" aria-label="Piaclista szűrése">
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            Összes
          </button>
          <button
            type="button"
            className={filter === "analysis" ? "active" : ""}
            aria-pressed={filter === "analysis"}
            onClick={() => setFilter("analysis")}
          >
            Elemezhető
          </button>
        </div>

        <label className="market-sort">
          <span>Rendezés</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="rank">Piaci érték</option>
            <option value="gainers">24h emelkedők</option>
            <option value="losers">24h csökkenők</option>
            <option value="name">Név</option>
          </select>
        </label>

        <div className="market-catalog-state" aria-live="polite">
          {(loading || refreshing) && <FiRefreshCw className="spin" aria-hidden="true" />}
          <span>
            {loading
              ? "200 eszköz betöltése"
              : catalog?.partial
                ? "Részleges Binance-adatok"
                : `${source} rangsor`}
          </span>
        </div>
      </div>

      {error && (
        <div className="market-catalog-warning" role="status">
          <span>{error} Az elérhető rövid lista látható.</span>
          <button type="button" onClick={onRetry}>
            <FiRefreshCw aria-hidden="true" />
            Újrapróbálás
          </button>
        </div>
      )}

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Eszköz</th>
              <th>Ár</th>
              <th>24 óra</th>
              <th>7 nap</th>
              <th>Piaci érték</th>
              <th>Modell</th>
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
                      aria-label={`${row.name} elemzésének megnyitása`}
                    >
                      <FiActivity aria-hidden="true" />
                      {row.id === selectedCoin ? "Megnyitva" : "Elemzés"}
                    </button>
                  ) : (
                    <span className="price-only">Csak ár</span>
                  )}
                </td>
              </tr>
            ))}
            {visibleRows.length === 0 && (
              <tr>
                <td className="market-empty" colSpan="7">
                  Nincs a keresésnek megfelelő eszköz.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className="market-pagination">
        <span>{firstVisible}–{lastVisible} / {filteredRows.length}</span>
        <strong>{safePage} / {pageCount} oldal</strong>
        <div>
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={safePage === 1}
            aria-label="Előző oldal"
            title="Előző oldal"
          >
            <FiChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
            disabled={safePage === pageCount}
            aria-label="Következő oldal"
            title="Következő oldal"
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      </footer>
    </section>
  );
}

export default MarketTable;

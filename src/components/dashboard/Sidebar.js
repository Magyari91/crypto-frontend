import React, { useEffect, useState } from "react";
import {
  FiActivity,
  FiBarChart2,
  FiFileText,
  FiGrid,
  FiList,
  FiRadio,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import { useLanguage } from "../../i18n/LanguageContext";

function createNavigation(coin, copy) {
  const forecastPath = `/forecast/${coin || "bitcoin"}`;
  return [
    { href: "/", label: copy.nav.overview, icon: FiGrid, view: "dashboard" },
    { href: forecastPath, label: copy.nav.forecast, icon: FiTrendingUp, view: "forecast" },
    { href: "/models", label: copy.nav.performance, icon: FiBarChart2, view: "models" },
    { href: `${forecastPath}#signals`, label: copy.nav.signals, icon: FiActivity, view: "signals" },
    { href: `${forecastPath}#risk`, label: copy.nav.risk, icon: FiShield, view: "risk" },
    { href: "/market", label: copy.nav.market, icon: FiList, view: "market" },
    { href: "/news", label: copy.nav.news, icon: FiFileText, view: "news" },
  ];
}

function Sidebar({ online, loading, activeView = "dashboard", coin = "bitcoin" }) {
  const { copy } = useLanguage();
  const [activeSection, setActiveSection] = useState("");
  const statusLabel = loading ? copy.nav.connecting : online ? copy.nav.apiOnline : copy.nav.apiOffline;
  const navigation = createNavigation(coin, copy);

  useEffect(() => {
    const syncActiveSection = () => {
      const hash = window.location.hash.slice(1);
      setActiveSection(["signals", "risk"].includes(hash) ? hash : "");
    };

    syncActiveSection();
    window.addEventListener("hashchange", syncActiveSection);
    return () => window.removeEventListener("hashchange", syncActiveSection);
  }, []);

  const selectedView = activeSection || activeView;

  return (
    <aside className="sidebar" aria-label={copy.nav.main}>
      <a className="brand" href="/" aria-label={copy.nav.home}>
        <span className="brand-mark">CV</span>
        <span>
          <strong>CryptoVision</strong>
          <small>Forecast desk</small>
        </span>
      </a>

      <nav className="sidebar-nav">
        {navigation.map(({ href, label, icon: Icon, view }) => (
          <a
            className={selectedView === view ? "active" : ""}
            href={href}
            key={href}
            aria-current={selectedView === view ? "page" : undefined}
            aria-label={label}
            title={label}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <div className={`api-status ${online ? "online" : ""}`}>
        <FiRadio aria-hidden="true" />
        <span>
          <small>{copy.nav.systemStatus}</small>
          <strong>{statusLabel}</strong>
        </span>
      </div>

      <p className="sidebar-note">{copy.nav.note}</p>
    </aside>
  );
}

export default Sidebar;

import React from "react";
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

function createNavigation(coin) {
  const forecastPath = `/forecast/${coin || "bitcoin"}`;
  return [
    { href: "/", label: "Áttekintés", icon: FiGrid, view: "dashboard" },
    { href: forecastPath, label: "Előrejelzés", icon: FiTrendingUp, view: "forecast" },
    { href: "/models", label: "Teljesítmény", icon: FiBarChart2, view: "models" },
    { href: `${forecastPath}#signals`, label: "Jelzések", icon: FiActivity, view: "signals" },
    { href: `${forecastPath}#risk`, label: "Kockázat", icon: FiShield, view: "risk" },
    { href: "/market", label: "Piaclista", icon: FiList, view: "market" },
    { href: "/news", label: "Hírek", icon: FiFileText, view: "news" },
  ];
}

function Sidebar({ online, loading, activeView = "dashboard", coin = "bitcoin" }) {
  const statusLabel = loading ? "Kapcsolódás" : online ? "API online" : "API offline";
  const navigation = createNavigation(coin);

  return (
    <aside className="sidebar" aria-label="Fő navigáció">
      <a className="brand" href="/" aria-label="CryptoVision kezdőlap">
        <span className="brand-mark">CV</span>
        <span>
          <strong>CryptoVision</strong>
          <small>Forecast desk</small>
        </span>
      </a>

      <nav className="sidebar-nav">
        {navigation.map(({ href, label, icon: Icon, view }) => (
          <a
            className={activeView === view ? "active" : ""}
            href={href}
            key={href}
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
          <small>Rendszerállapot</small>
          <strong>{statusLabel}</strong>
        </span>
      </div>

      <p className="sidebar-note">Kísérleti piaci elemzés. Nem pénzügyi tanács.</p>
    </aside>
  );
}

export default Sidebar;

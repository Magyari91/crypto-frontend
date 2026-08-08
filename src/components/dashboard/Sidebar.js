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

const navigation = [
  { href: "#overview", label: "Áttekintés", icon: FiGrid },
  { href: "#forecast", label: "Előrejelzés", icon: FiTrendingUp },
  { href: "#performance", label: "Teljesítmény", icon: FiBarChart2 },
  { href: "#signals", label: "Jelzések", icon: FiActivity },
  { href: "#risk", label: "Kockázat", icon: FiShield },
  { href: "#market", label: "Piaclista", icon: FiList },
  { href: "#news", label: "Hírek", icon: FiFileText },
];

function Sidebar({ online, loading }) {
  const statusLabel = loading ? "Kapcsolódás" : online ? "API online" : "API offline";

  return (
    <aside className="sidebar" aria-label="Fő navigáció">
      <a className="brand" href="#overview" aria-label="CryptoVision kezdőlap">
        <span className="brand-mark">CV</span>
        <span>
          <strong>CryptoVision</strong>
          <small>Forecast desk</small>
        </span>
      </a>

      <nav className="sidebar-nav">
        {navigation.map(({ href, label, icon: Icon }, index) => (
          <a
            className={index === 0 ? "active" : ""}
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

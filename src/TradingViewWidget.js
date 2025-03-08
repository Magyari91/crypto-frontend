import React, { useEffect, useRef } from "react";

const TradingViewWidget = ({ symbol, darkMode }) => {
  const container = useRef(null);

  useEffect(() => {
    if (container.current && !container.current.firstChild) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [[symbol.toUpperCase(), `COINBASE:${symbol.toUpperCase()}USD`]],
        chartOnly: false,
        width: "100%",
        height: "400",
        locale: "en",
        colorTheme: darkMode ? "dark" : "light",
        gridLineColor: "rgba(240, 243, 250, 0)",
        fontColor: darkMode ? "#FFFFFF" : "#000000",
        isTransparent: false,
        autosize: true,
        container_id: "tradingview-widget",
      });

      container.current.appendChild(script);
    }
  }, [symbol, darkMode]);

  return (
    <div ref={container} className="tradingview-widget-container" />
  );
};

export default TradingViewWidget;

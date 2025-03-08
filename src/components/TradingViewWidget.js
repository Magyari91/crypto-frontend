import React, { useEffect, useRef } from 'react';

const TradingViewWidget = ({ symbol, darkMode }) => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.TradingView && container.current) {
        new window.TradingView.widget({
          symbol: symbol,
          width: '100%',
          height: '500',
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: darkMode ? 'dark' : 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: darkMode ? '#292929' : '#f1f1f1',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: container.current.id,
        });
      }
    };

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol, darkMode]);

  return <div ref={container} className="tradingview-widget-container" id="tradingview-widget-container"></div>;
};

export default TradingViewWidget;
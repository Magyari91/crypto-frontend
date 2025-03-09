// CryptoCard.js
function CryptoCard({ coin, data, darkMode }) {
  // ...
  return (
    <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-white"} shadow-md transition-all duration-300`}>
      <h3 className="text-lg font-semibold mb-2 text-center">{coin}</h3>
      <p className="text-sm text-center">Ár: ${data.price.toFixed(2)}</p>
      <p className="text-sm text-center">Változás 24 óra: {data.change24h.toFixed(2)}%</p>
    </div>
  );
}

// App.js
function App() {
  // ...
  return (
    <div className={darkMode ? "dark bg-gray-900 text-gray-100 min-h-screen transition-colors duration-300" : "bg-gray-50 text-gray-900 min-h-screen transition-colors duration-300"}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-6xl flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center md:text-left">
              CryptoVision
            </h1>
            //...
          </div>

          <SearchBar onSelect={handleCoinSelect} />

          <div className="w-full max-w-6xl mb-12">
            <div className={`p-8 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-2xl transition-all duration-300 hover:shadow-xl`}>
              {/*...*/}
              {cryptoData ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <CryptoCard coin="BTC" data={cryptoData.btc_price} darkMode={darkMode} />
                  <CryptoCard coin="ETH" data={cryptoData.eth_price} darkMode={darkMode} />
                  <CryptoCard coin="DOGE" data={cryptoData.doge_price} darkMode={darkMode} />
                </div>
              ) : null}
            </div>
          </div>
          //...
        </div>
      </div>
    </div>
  );
}
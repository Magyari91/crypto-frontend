export const ANALYZED_COINS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "binancecoin", symbol: "BNB", name: "BNB" },
  { id: "ripple", symbol: "XRP", name: "XRP" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "tron", symbol: "TRX", name: "TRON" },
  { id: "hyperliquid", symbol: "HYPE", name: "Hyperliquid" },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin" },
  { id: "zcash", symbol: "ZEC", name: "Zcash" },
  { id: "cardano", symbol: "ADA", name: "Cardano" },
];

export function findAnalyzedCoin(id) {
  return ANALYZED_COINS.find((coin) => coin.id === id);
}

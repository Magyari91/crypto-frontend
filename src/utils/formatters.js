const currencyFormatters = new Map();

function currencyFormatter(maximumFractionDigits) {
  if (!currencyFormatters.has(maximumFractionDigits)) {
    currencyFormatters.set(
      maximumFractionDigits,
      new Intl.NumberFormat("hu-HU", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits,
      })
    );
  }
  return currencyFormatters.get(maximumFractionDigits);
}

export function formatPrice(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  const digits = number < 1 ? 5 : number < 100 ? 2 : 0;
  return currencyFormatter(digits).format(number);
}

export function formatCompactCurrency(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(number);
}

export function formatPercent(value, withSign = false) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  const sign = withSign && number > 0 ? "+" : "";
  return `${sign}${number.toFixed(2).replace(".", ",")}%`;
}

export function formatUpdatedAt(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
}

export function formatNewsTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("hu-HU", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

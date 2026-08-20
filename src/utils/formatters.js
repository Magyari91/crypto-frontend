const currencyFormatters = new Map();
let activeLocale = "hu-HU";

export function setFormatterLocale(locale) {
  activeLocale = locale || "hu-HU";
}

function currencyFormatter(maximumFractionDigits) {
  const key = `${activeLocale}:${maximumFractionDigits}`;
  if (!currencyFormatters.has(key)) {
    currencyFormatters.set(
      key,
      new Intl.NumberFormat(activeLocale, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits,
      })
    );
  }
  return currencyFormatters.get(key);
}

export function formatPrice(value) {
  if (value == null || value === "") return "-";
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  const digits = number < 1 ? 5 : number < 100 ? 2 : 0;
  return currencyFormatter(digits).format(number);
}

export function formatCompactCurrency(value) {
  if (value == null || value === "") return "-";
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return new Intl.NumberFormat(activeLocale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(number);
}

export function formatPercent(value, withSign = false) {
  if (value == null || value === "") return "-";
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  const sign = withSign && number > 0 ? "+" : "";
  return `${sign}${new Intl.NumberFormat(activeLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number)}%`;
}

export function formatUpdatedAt(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat(activeLocale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(value));
}

export function formatNewsTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat(activeLocale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

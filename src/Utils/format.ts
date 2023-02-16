export const curencyFormat = Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currencyDisplay: 'symbol',
  });

export const numberFormat = Intl.NumberFormat("ru-RU", {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})
export default function formatPriceLower(price) {
  return Number(price)
    .toFixed(8)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

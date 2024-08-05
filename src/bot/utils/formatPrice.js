export default function formatPrice(price) {
  return Number(price)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

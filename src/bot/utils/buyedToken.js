import formatPrice from "./formatPrice.js";
import formatPriceLower from "./formatPriceLower.js";
import formatWallet from "./formatWallet.js";

export default function (token, trade, infoPool, holders) {
  // let liquicidy = poolInfo.attributes.reserve_in_usd;
  // let price_percent_change = poolInfo.attributes.price_percent_change;

  return `🟢 ${
    token?.telegram_handle
      ? `<a href="t.me/${token.telegram_handle}">${token.name}</a>`
      : `${token.name}`
  } <b>Buy!</b> 🟢\n\n<b>Spent:</b> $${formatPrice(
    trade.volume_in_usd
  )} (${formatPrice(trade.from_token_amount)} TON)\n<b>Got:</b> ${
    formatPrice(trade.to_token_amount) + ` ${token.symbol}`
  }\n<b>Wallet:</b> <a href="https://tonviewer.com/${
    trade.tx_from_address
  }">${formatWallet(trade.tx_from_address)}</a>\n<b>Сhange in last 24 hours: ${
    infoPool.attributes.price_change_percentage.h24.slice(0, 1) === "-"
      ? infoPool.attributes.price_change_percentage.h24
      : `+${infoPool.attributes.price_change_percentage.h24}`
  }%</b>\n<b>Price:</b> $${formatPriceLower(
    trade.price_to_in_usd
  )}\n<b>MCap:</b>${
    infoPool.attributes.fdv_usd !== null
      ? `$ ${formatPrice(infoPool.attributes.fdv_usd)}`
      : "<i>No information</i>"
  }\n<b>Liquidity:</b> $${formatPrice(
    infoPool.attributes.reserve_in_usd
  )}\n<b>Holders:</b> ${holders}\n\n${`<a href="https://tonviewer.com/transaction/${trade.tx_hash}">TX</a> |`} ${`<a href="https://www.geckoterminal.com/ton/pools/${infoPool.attributes.address}">Chart</a> |`} ${
    token?.websites
      ? `<a href="${token.websites.split(",")[0]}">Site</a> |`
      : ""
  } ${
    token?.discord_url
      ? `<a href="https://discord.gg/${token.discord_url}">Discord</a> |`
      : ""
  }${
    token?.telegram_handle
      ? `<a href="t.me/${token.telegram_handle}">Telegram</a> |`
      : ""
  } ${
    token?.twitter_handle
      ? `<a href="www.twitter.com/${token.twitter_handle}">Twitter</a>`
      : ""
  }`;
}

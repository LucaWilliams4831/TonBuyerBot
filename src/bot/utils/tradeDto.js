export class TradeDto {
  constructor(trade, count_trade, pools, counte_pool, token_address) {
    const data = {
      id: trade[count_trade].id,
      tx_hash: trade[count_trade].attributes.tx_hash,
      tx_from_address: trade[count_trade].attributes.tx_from_address,
      from_token_amount: trade[count_trade].attributes.from_token_amount,
      to_token_amount: trade[count_trade].attributes.to_token_amount,
      price_from_in_usd: trade[count_trade].attributes.price_from_in_usd,
      price_to_in_usd: trade[count_trade].attributes.price_to_in_usd,
      volume_in_usd: trade[count_trade].attributes.volume_in_usd,
      from_token_address: trade[count_trade].attributes.from_token_address,
      to_token_address: trade[count_trade].attributes.to_token_address,
      block_timestamp: trade[count_trade].attributes.block_timestamp,
      token_address: pools[counte_pool].token_address || token_address,
    };

    return data;
  }
}

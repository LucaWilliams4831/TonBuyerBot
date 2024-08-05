import {db} from "../index.js";

export default function createLastTrades() {
  // const data = {
    //   id: trade[count_trade].id,
    //   tx_hash: trade[count_trade].attributes.tx_hash,
    //   tx_from_address: trade[count_trade].attributes.tx_from_address,
    //   from_token_amount: trade[count_trade].attributes.from_token_amount,
    //   to_token_amount: trade[count_trade].attributes.to_token_amount,
    //   price_from_in_usd: trade[count_trade].attributes.price_from_in_usd,
    //   price_to_in_usd: trade[count_trade].attributes.price_to_in_usd,
    //   volume_in_usd: trade[count_trade].attributes.volume_in_usd,
    //   from_token_address: trade[count_trade].attributes.from_token_address,
    //   to_token_address: trade[count_trade].attributes.to_token_address,
    //   block_timestamp: trade[count_trade].attributes.block_timestamp,
    //   token_address: pools[counte_pool].token_address,
    // };
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS  lastTrades (
        id INTEGER PRIMARY KEY, 
        trade_id TEXT NOT NULL, 
        tx_hash TEXT NOT NULL,
        tx_from_address TEXT NOT NULL, 
        from_token_amount TEXT NOT NULL, 
        to_token_amount TEXT NOT NULL, 
        price_from_in_usd TEXT NOT NULL, 
        price_to_in_usd TEXT NOT NULL, 
        volume_in_usd TEXT NOT NULL, 
        from_token_address TEXT NOT NULL, 
        to_token_address TEXT NOT NULL, 
        block_timestamp TEXT NOT NULL, 
        token_address TEXT NOT NULL
      )`,
      [],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

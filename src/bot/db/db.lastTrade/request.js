import { db } from "../index.js";
// Создание нового трейда
export async function createAndCheckLastTrade(trade) {
  function checkTrade(trade) {
    return new Promise((resolve, reject) => {
      db.all(
        // "CREATE TABLE IF NOT EXISTS  pools (id INTEGER PRIMARY KEY, pool_id TEXT NOT NULL, address TEXT NOT NULL, name TEXT NOT NULL)",
        "SELECT * FROM lastTrades WHERE (token_address)  = (?)",
        [trade.token_address],
        function (err, rows) {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  async function createTrade(trade) {
    return new Promise((resolve, reject) => {
      let values = Object.values(trade);

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
      db.run(
        `
        INSERT INTO lastTrades (
          trade_id, 
          tx_hash, 
          tx_from_address, 
          from_token_amount, 
          to_token_amount, 
          price_from_in_usd, 
          price_to_in_usd, 
          volume_in_usd, 
          from_token_address, 
          to_token_address, 
          block_timestamp, 
          token_address
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        values,
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve("created");
          }
        }
      );
    });
  }

  try {
    const rows = await checkTrade(trade);
    if (rows.length === 0) {
      await createTrade(trade);
      const res = checkTrade(trade);
      return res[0];
    } else {
      return "exist";
    }
  } catch (err) {
    console.error("Ошибка при добавлении последнего  токена в таблицу", err);
    return "error";
  }
}

// Получение всех трейдов
export async function GetTrades() {
  function getTrades() {
    return new Promise((resolve, reject) => {
      db.all(
        // "CREATE TABLE IF NOT EXISTS  pools (id INTEGER PRIMARY KEY, pool_id TEXT NOT NULL, address TEXT NOT NULL, name TEXT NOT NULL)",
        "SELECT * FROM lastTrades",
        [],
        function (err, rows) {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  try {
    const rows = await getTrades();
    if (rows.length > 0) {
      return rows;
    } else {
      return "empty";
    }
  } catch (err) {
    console.error("Ошибка при добавлении последнего  токена в таблицу", err);
    return "error";
  }
}

// Получение всех трейдов по адрессу токена
export async function GetTradesByTokenAddress(token_address) {
  function getTrades(token_address) {
    return new Promise((resolve, reject) => {
      db.all(
        // "CREATE TABLE IF NOT EXISTS  pools (id INTEGER PRIMARY KEY, pool_id TEXT NOT NULL, address TEXT NOT NULL, name TEXT NOT NULL)",
        "SELECT * FROM lastTrades WHERE token_address = ?",
        [token_address],
        function (err, rows) {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  try {
    const rows = await getTrades(token_address);

    if (rows.length > 0) {
      return rows[0];
    } else {
      return "empty";
    }
  } catch (err) {
    console.error("Ошибка при добавлении последнего  токена в таблицу", err);
    return "error";
  }
}

// Обновление последнего трейда токена по адрессу токена
export async function updateLastTrade(trade, token_address) {
  function checkTrade(trade) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM lastTrades WHERE (trade_id)  = (?)",
        [trade.id],
        function (err, rows) {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  function updateTrade(trade, token_address) {
    return new Promise((resolve, reject) => {
      let values = Object.values(trade, token_address);
      values.push(token_address);
      db.all(
        // (trade_id, tx_from_address, from_token_amount, to_token_amount, price_from_in_usd, volume_in_usd, from_token_address, to_token_address, token_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `UPDATE lastTrades 
        SET trade_id = ?, 
        tx_hash = ?,
            tx_from_address = ?, 
            from_token_amount = ?, 
            to_token_amount = ?, 
            price_from_in_usd = ?, 
            price_to_in_usd = ?, 
            volume_in_usd = ?, 
            from_token_address = ?, 
            to_token_address = ?, 
            block_timestamp = ?, 
            token_address = ?
        WHERE token_address = ?
      `,
        values,
        function (err, rows) {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  try {
    const rows = await checkTrade(trade);
    if (rows.length === 0) {
      await updateTrade(trade, token_address);
      const res = await checkTrade(trade);
      return res[0];
    } else {
      return "lastVersion";
    }
  } catch (err) {
    console.error("Ошибка при обновлении последнего трейда", err);
    return "error";
  }
}

// Получение всех трейдов по адрессу пулла?

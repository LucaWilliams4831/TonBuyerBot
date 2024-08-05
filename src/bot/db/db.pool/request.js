import {db} from "../index.js";

// Создание нового пулла (уникальный)
export async function createAndCheckPool(pool) {
  function checkPool(pool) {
    return new Promise((resolve, reject) => {
      db.all(
        // "CREATE TABLE IF NOT EXISTS  pools (id INTEGER PRIMARY KEY, pool_id TEXT NOT NULL, address TEXT NOT NULL, name TEXT NOT NULL)",
        "SELECT * FROM pools WHERE (pool_id)  = (?)",
        [pool.id],
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

  async function createPool(pool) {
    return new Promise((resolve, reject) => {
      let values = Object.values(pool);

      db.run(
        "INSERT INTO pools (pool_id, address, name, token_address) VALUES (?, ?, ?, ?)",
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
    const rows = await checkPool(pool);
    if (rows.length === 0) {
      await createPool(pool);
    } else {
      return "exist";
    }
  } catch (err) {
    console.error("Ошибка при добавлении нового токена в таблицу", err);
    return "error";
  }
}

// Получение всех пуллов
export async function GetPools() {
  function getPools() {
    return new Promise((resolve, reject) => {
      db.all(
        // "CREATE TABLE IF NOT EXISTS  pools (id INTEGER PRIMARY KEY, pool_id TEXT NOT NULL, address TEXT NOT NULL, name TEXT NOT NULL)",
        "SELECT * FROM pools",
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
    const rows = await getPools();
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

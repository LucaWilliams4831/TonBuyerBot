import {db} from "../index.js";
// Создание нового токена для группы
export async function createAndCheckToken(token, group_id) {
  function checkToken(token, group_id) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM tokens WHERE (address, group_id)  = (?, ?)",
        [token.address, group_id],
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

  async function createToken(token, group_id) {
    return new Promise((resolve, reject) => {
      let values = Object.values(token);
      values.push(group_id);

      db.run(
        "INSERT INTO tokens  (token_id, type, address, name, symbol, \
             image_url, websites, description, discord_url, telegram_handle, \
              twitter_handle, group_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
    const rows = await checkToken(token, group_id);
    if (rows.length === 0) {
      await createToken(token, group_id);
      const res = await checkToken(token, group_id);
      return res;
    } else {
      return "exist";
    }
  } catch (err) {
    console.error("Ошибка при добавлении нового токена в таблицу", err);
    return "error";
  }
}

// Обновление image_url токена по id
export async function updateImageUrlTokenById(image_url, id) {
  function checkToken(id) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM tokens WHERE (id)  = (?)",
        [id],
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

  function updateImageUrl(image_url, id) {
    return new Promise((resolve, reject) => {
      db.all(
        "UPDATE tokens SET image_url = ? WHERE id = ?",
        [image_url, id],
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
    const rows = await checkToken(id);
    if (rows.length > 0) {
      await updateImageUrl(image_url, id);
      const res = await checkToken(id);
      return res[0];
    } else {
      return "not exist";
    }
  } catch (err) {
    console.error("Ошибка при добавлении обновлении фотки", err);
    return "error";
  }
}

// Получение токена по его адрессу
export async function GetTokensByAddress(address) {
  function getTokens(address) {
    return new Promise((resolve, reject) => {
      db.all(
        // "CREATE TABLE IF NOT EXISTS  pools (id INTEGER PRIMARY KEY, pool_id TEXT NOT NULL, address TEXT NOT NULL, name TEXT NOT NULL)",
        "SELECT * FROM tokens WHERE address = ?",
        [address],
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
    const rows = await getTokens(address);

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

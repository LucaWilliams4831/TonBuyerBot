import {db} from "../index.js";
// Создание нового юзера
export async function createAndCheckNewUser(newUser) {
  function checkUser(newUser) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM users WHERE user_id = ?",
        [newUser.user_id],
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

  async function createUser(newUser) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO users (user_id, first_name, username, language_code) VALUES (?, ?, ?, ?)",
        [
          newUser.user_id,
          newUser.first_name,
          newUser.username,
          newUser.language_code,
        ],
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
    const rows = await checkUser(newUser);
    if (rows.length === 0) {
      return await createUser(newUser);
    } else {
      return "exist";
    }
  } catch (err) {
    console.error("Ошибка при добавлении человека в таблицу", err);
    return "error";
  }
}

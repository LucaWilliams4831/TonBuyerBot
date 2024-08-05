import {db} from "../index.js";
export default function createTableUsers() {
  return new Promise((resolve, reject) => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        first_name TEXT,
        username TEXT,
        language_code TEXT
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
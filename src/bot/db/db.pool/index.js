import {db} from "../index.js";
export default function createPools() {
  return new Promise((resolve, reject) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS  pools (id INTEGER PRIMARY KEY, pool_id TEXT NOT NULL, address TEXT NOT NULL UNIQUE, name TEXT NOT NULL, token_address TEXT NOT NULL)",
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
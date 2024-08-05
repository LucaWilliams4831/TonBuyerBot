import { db } from "../index.js";
export default function createTokens() {
  return new Promise((resolve, reject) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS  tokens (id INTEGER PRIMARY KEY, token_id TEXT NOT NULL, type TEXT, address TEXT NOT NULL, name TEXT NOT NULL, symbol TEXT NOT NULL, image_url TEXT, websites TEXT, description TEXT, discord_url TEXT, telegram_handle TEXT, twitter_handle TEXT, group_id INTEGER NOT NULL)",
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

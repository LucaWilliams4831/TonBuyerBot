import sqlite3 from "sqlite3";

import createTableUsers from "./db.tgUser/index.js";
import createGroups from "./db.tg.group/index.js";
import createTokens from "./db.token/index.js";
import createPools from "./db.pool/index.js";
import createLastTrades from "./db.lastTrade/index.js";

export const db = new sqlite3.Database("db.db");

export async function checkAndCreateTable() {
  try {
    await createTableUsers();
    await createGroups();
    await createTokens();
    await createPools();
    await createLastTrades();
    console.log("Таблицы работают!");
  } catch (err) {
    console.error("Ошибка при создании одной таблиц':", err);
  }
}

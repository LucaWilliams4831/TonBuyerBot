import {db} from "../index.js";

export default function createGroups() {
    return new Promise((resolve, reject) => {
      db.run(
        "CREATE TABLE IF NOT EXISTS  groups (id INTEGER PRIMARY KEY, group_id INTEGER NOT NULL)",
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


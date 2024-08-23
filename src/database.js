const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function setupDatabase() {
  const db = await open({
    filename: "chat.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
    );
  `);

  return db;
}

module.exports = setupDatabase;

const path = require("path");
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "db.sqlite3"),
    },
    pool: {
      afterCreate: (conn, done) => {
        // + загрузка модуля поддержки Unicode
        conn.loadExtension(`${__dirname}/modules/unicode`, (err) => {
          if (err) throw new Error(`Модуль поиска Unicode: ${err}`);
          // + поддержка внешних ключей
          conn.run("PRAGMA foreign_keys = ON");
          done(null, conn);
        });
      },
    },
    migrations: {
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  },
};

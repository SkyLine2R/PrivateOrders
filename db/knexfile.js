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
        conn.loadExtension(`${__dirname}/modules/unicode`, (err) => {
          if (err) throw new Error(`Модуль поиска Unicode: ${err}`);
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

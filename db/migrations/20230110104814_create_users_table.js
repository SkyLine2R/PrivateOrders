exports.up = (knex) =>
  knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name", 40).notNullable();
    table.string("login", 15).unique().notNullable();
    table.string("pass", 60).notNullable();
    table.integer("privelegies", 3).notNullable();
    table.timestamp("createdAt", { precision: 6 }).defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("users");

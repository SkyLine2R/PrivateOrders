exports.up = (knex) =>
  knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name", 80).notNullable();
    table.string("login", 20).notNullable();
    table.string("pass", 20).notNullable();
    table.integer("privelegies", 3).notNullable();
    table
      .timestamp("createdAt", { precision: 6 })
      .defaultTo(knex.fn.now("localtime"));
  });

exports.down = (knex) => knex.schema.dropTable("users");

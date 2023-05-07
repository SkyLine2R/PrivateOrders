exports.up = (knex) =>
  knex.schema.createTable("stock", (table) => {
    table.increments("id").primary();
    table.integer("item").unsigned().notNullable();
    table.foreign("item").references("items.id").onDelete("RESTRICT");
    table.integer("color").unsigned();
    table.foreign("color").references("color.id").onDelete("RESTRICT");
    table.real("amount").unsigned().notNullable();
    table.string("notes", 180);
    table.integer("createdBy").unsigned().notNullable();
    table.foreign("createdBy").references("users.id");
    table.timestamp("createdAt", { precision: 6 }).defaultTo(knex.fn.now());
    table.timestamp("updatedAt", { precision: 6 }).defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("stock");

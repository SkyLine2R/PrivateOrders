exports.up = (knex) =>
  knex.schema.createTable("units", (table) => {
    table.increments("id").primary();
    table.string("name", 15).unique().notNullable();
    table.string("notes", 180); // примечания
    table.timestamp("createdAt", { precision: 6 }).defaultTo(Date.now());
    table.integer("createdBy").unsigned().notNullable();
    table.foreign("createdBy").references("users.id").onDelete("RESTRICT"); // автор документа
    table.timestamp("updatedAt", { precision: 6 }).defaultTo(Date.now());
    table.integer("updatedBy").unsigned().notNullable();
    table.foreign("updatedBy").references("users.id").onDelete("RESTRICT");
  });

exports.down = (knex) => knex.schema.dropTable("units");

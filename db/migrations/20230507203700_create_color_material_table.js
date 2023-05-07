exports.up = (knex) =>
  knex.schema.createTable("colors", (table) => {
    table.increments("id").primary(); // id
    table.string("colorName", 255).notNullable().unique(); // название
    table.string("notes", 180); // примечания
    table.integer("createdBy").unsigned().notNullable();
    table.foreign("createdBy").references("users.id").onDelete("RESTRICT"); // автор документа
    table.timestamp("createdAt", { precision: 6 }).defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("colors");

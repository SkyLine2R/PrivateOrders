exports.up = (knex) =>
  knex.schema.createTable("colors", (table) => {
    table.increments("id").primary(); // id
    table.string("name", 255).notNullable().unique(); // название
    table.string("notes", 180); // примечания
    table
      .timestamp("createdAt", { precision: 6 })
      .defaultTo(new Date(Date.now()).toLocaleString());
    table.integer("createdBy").unsigned().notNullable();
    table.foreign("createdBy").references("users.id").onDelete("RESTRICT"); // автор документа
    table
      .timestamp("updatedAt", { precision: 6 })
      .defaultTo(new Date(Date.now()).toLocaleString());
    table.integer("updatedBy").unsigned().notNullable();
    table.foreign("updatedBy").references("users.id").onDelete("RESTRICT");
  });

exports.down = (knex) => knex.schema.dropTable("colors");

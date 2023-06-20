exports.up = (knex) =>
  knex.schema.createTable("customers", (table) => {
    table.increments("id").primary(); // id
    table.string("name", 155).notNullable(); // наименование
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

exports.down = (knex) => knex.schema.dropTable("customers");

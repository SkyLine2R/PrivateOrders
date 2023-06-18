exports.up = (knex) =>
  knex.schema.createTable("customers", (table) => {
    table.increments("id").primary(); // id
    table.string("name", 155).notNullable(); // наименование
    table.string("notes", 180); // примечания
    table.integer("createdBy").unsigned().notNullable();
    table.foreign("createdBy").references("users.id");
    table.timestamp("createdAt", { precision: 6 }).defaultTo(knex.fn.now());
    table.integer("updatedBy").unsigned().notNullable();
    table.foreign("updatedBy").references("users.id");
    table.timestamp("updatedAt", { precision: 6 }).defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("customers");

exports.up = (knex) =>
  knex.schema.createTable("documentsInStock", (table) => {
    table.increments("id").primary(); // id
    table.timestamp("date", { precision: 6 }).notNullable(); // дата документа
    table.string("name", 255).notNullable(); // название
    table.string("number", 10).notNullable(); // номер
    table.integer("customer").unsigned().notNullable();
    table.foreign("customer").references("customers.id").onDelete("RESTRICT");
    table.string("notes", 180); // примечания
    table.timestamp("createdAt", { precision: 6 }).defaultTo(Date.now());
    table.integer("createdBy").unsigned().notNullable();
    table.foreign("createdBy").references("users.id").onDelete("RESTRICT"); // автор документа
    table.timestamp("updatedAt", { precision: 6 }).defaultTo(Date.now());
    table.integer("updatedBy").unsigned().notNullable();
    table.foreign("updatedBy").references("users.id").onDelete("RESTRICT");
  });

exports.down = (knex) => knex.schema.dropTable("inStockDocuments");

exports.up = (knex) =>
  knex.schema.createTable("outStockDocuments", (table) => {
    table.increments("id").primary(); // id
    table.timestamp("documentDate", { precision: 6 }).notNullable(); // дата документа
    table.string("documentName", 255).notNullable(); // название
    table.integer("documentNumber", 9).notNullable(); // номер
    table.integer("customer").unsigned().notNullable();
    table.foreign("customer").references("customers.id").onDelete("RESTRICT");
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

exports.down = (knex) => knex.schema.dropTable("outStockDocuments");

exports.up = (knex) =>
  knex.schema.createTable("inStock", (table) => {
    table.increments("id").primary();
    table.integer("stock").unsigned().notNullable();
    table.foreign("stock").references("stock.id").onDelete("RESTRICT");
    table.decimal("amount", 10, 3).unsigned().notNullable();
    table.integer("document").unsigned().notNullable();
    table
      .foreign("document")
      .references("documentsInStock.id")
      .onDelete("RESTRICT");
    table.string("notes", 180);
    table.integer("order").unsigned(); // на будущее сделать изменяемый порядок сортировки материала в документе
    table.timestamp("createdAt", { precision: 6 }).defaultTo(Date.now());
    table.integer("createdBy").unsigned().notNullable();
    table.foreign("createdBy").references("users.id").onDelete("RESTRICT"); // автор документа
    table.timestamp("updatedAt", { precision: 6 }).defaultTo(Date.now());
    table.integer("updatedBy").unsigned().notNullable();
    table.foreign("updatedBy").references("users.id").onDelete("RESTRICT");
  });

exports.down = (knex) => knex.schema.dropTable("inStock");

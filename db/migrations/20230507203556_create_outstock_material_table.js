exports.up = (knex) =>
  knex.schema.createTable("outStock", (table) => {
    table.increments("id").primary();
    table.integer("stock").unsigned().notNullable();
    table.foreign("stock").references("stock.id").onDelete("RESTRICT");
    table.decimal("amount", 10, 3).unsigned().notNullable();
    table.integer("document").unsigned().notNullable();
    table
      .foreign("document")
      .references("documentsOutStock.id")
      .onDelete("RESTRICT");
    table.string("notes", 180);
    table.timestamp("createdAt", { precision: 6 }).defaultTo(Date.now());
    table.integer("createdBy").unsigned().notNullable();
    table.foreign("createdBy").references("users.id").onDelete("RESTRICT"); // автор документа
    table.timestamp("updatedAt", { precision: 6 }).defaultTo(Date.now());
    table.integer("updatedBy").unsigned().notNullable();
    table.foreign("updatedBy").references("users.id").onDelete("RESTRICT");
  });

exports.down = (knex) => knex.schema.dropTable("outStock");

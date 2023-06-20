exports.up = (knex) =>
  knex.schema.createTable("stock", (table) => {
    table.increments("id").primary();
    table.integer("item").unsigned().notNullable();
    table.foreign("item").references("items.id").onDelete("RESTRICT");
    table.integer("color").unsigned();
    table.foreign("color").references("color.id").onDelete("RESTRICT");
    table.real("amount").unsigned().notNullable();
    table.string("notes", 180);
    table.integer("customer").unsigned().notNullable();
    table.foreign("customer").references("customers.id").onDelete("RESTRICT");
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

exports.down = (knex) => knex.schema.dropTable("stock");

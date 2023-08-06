/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable("vendorCodes", (table) => {
    table.increments("id").primary(); // id
    table.string("vendorCode", 20).notNullable(); // артикул
    table.string("name", 255).notNullable(); // наименование
    table.integer("unit", 3).references("units.id"); // единицы измерения
    table.decimal("quantity", 5, 3).notNullable(); // длина хлыста или кол-во в упаковке
    table.string("notes", 180); // примечания
    table.integer("createdBy").unsigned().notNullable();
    table.foreign("createdBy").references("users.id");
    table.timestamp("createdAt", { precision: 6 }).defaultTo(Date.now());
    table.integer("updatedBy").unsigned().notNullable();
    table.foreign("updatedBy").references("users.id");
    table.timestamp("updatedAt", { precision: 6 }).defaultTo(Date.now());
  });

exports.down = (knex) => knex.schema.dropTable("items");

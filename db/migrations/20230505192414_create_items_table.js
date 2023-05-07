/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable("items", (table) => {
    table.increments("id").primary(); // id
    table.string("vendorCode", 20).notNullable(); // артикул
    table.string("itemName", 255).notNullable(); // наименование
    table.integer("unit", 3).notNullable(); // единицы измерения
    table.real("quantity").notNullable(); // длина хлыста или кол-во в упаковке
    table.string("notes", 180); // примечания
    table.integer("createdBy").unsigned().notNullable();
    table.foreign("createdBy").references("users.id");
    table.timestamp("createdAt", { precision: 6 }).defaultTo(knex.fn.now());
    table.timestamp("updatedAt", { precision: 6 }).defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("items");

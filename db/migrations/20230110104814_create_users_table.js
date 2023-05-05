/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("items", (table) => {
    table.increments("id").primary(); // id
    table.string("tags", 460).notNullable(); // ключевые слова для поиска
    table.string("vendorCode", 20).notNullable(); // артикул
    table.string("itemName", 255).notNullable(); // наименование
    table.integer("unit", 3).notNullable(); // единицы измерения
    table.real("quantity").notNullable(); // длина хлыста или кол-во в упаковке
    table.string("notes", 180); // примечания
    table
      .timestamps()("created_at", { precision: 6 })
      .defaultTo(knex.fn.now(6));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("items");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("items", function (table) {
    table.increments("id").primary(); //id
    table.string("tags", 275).notNullable(); //ключевые слова для поиска
    table.string("vendorCode", 20); //артикул
    table.string("itemName", 255).notNullable(); //наименование
    table.string("unit", 15).notNullable(); //единицы измерения;
    table.real("length").notNullable(); //длина хлыста или кол-во в упаковке
    table.real("notes", 300); //примечания
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("items");
};

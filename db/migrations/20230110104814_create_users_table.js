/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("items", function (table) {
    table.increments("id").primary(); //id
    table.string("tags", 275).notNullable(); //ключевые слова для поиска
    table.string("vendorCode", 20).notNullable(); //артикул
    table.string("itemName", 255).notNullable(); //наименование
    table.integer("unit", 5).notNullable(); //единицы измерения { id: 1, label: "м / хл." },{ id: 2, label: "шт. / уп." },{ id: 3, label: "м / уп." }
    table.real("quantity").notNullable(); //длина хлыста или кол-во в упаковке
    table.real("notes", 200); //примечания
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("items");
};

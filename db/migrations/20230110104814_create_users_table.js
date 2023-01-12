/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("items", function (table) {
    table.increments("id").primary(); //id
    table.string("vendorСode", 50); //артикул
    table.string("name", 255).notNullable(); //наименование
    table.string("unit", 10).notNullable(); //единицы измерения;
    table.real("length"); //длина хлыста
    table.real("notes"); //примечания
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("items");
};

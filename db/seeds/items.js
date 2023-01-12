/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("items")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("items").insert([
        {
          id: 1,
          vendorСode: "010703",
          name: "Алюминиевый профиль закладная деталь для стойки",
          unit: "м",
          length: "6",
        },
        {
          id: 2,
          vendorСode: "432254",
          name: "Алюминиевый профиль стойка 149мм",
          unit: "м",
          length: "4.6",
        },
        {
          id: 3,
          vendorСode: "990117",
          name: "Саморез с пот. головкой 4,2*16 А2",
          unit: "шт",
        },
      ]);
    });
};

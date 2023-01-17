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
          item: "Алюминиевый профиль закладная деталь для стойки",
          unit: "м / хл.",
          length: "6",
          created_at: Date.now(),
          updated_at: Date.now(),
        },
        {
          id: 2,
          vendorСode: "432254",
          item: "Алюминиевый профиль стойка 149мм",
          unit: "м / хл.",
          length: "4.6",
          created_at: Date.now(),
          updated_at: Date.now(),
        },
        {
          id: 3,
          vendorСode: "990117",
          item: "Саморез с пот. головкой 4,2*16 А2",
          unit: "шт. / уп.",
          length: "100",
          created_at: Date.now(),
          updated_at: Date.now(),
        },
      ]);
    });
};

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
          tags: "010703 алюминиевый профиль закладная деталь для стойки",
          vendorCode: "010703",
          itemName: "Алюминиевый профиль закладная деталь для стойки",
          unit: "0",
          quantity: "6",
          created_at: Date.now(),
          updated_at: Date.now(),
        },
        {
          id: 2,
          tags: "432254 алюминиевый профиль стойка 149мм",
          vendorCode: "432254",
          itemName: "Алюминиевый профиль стойка 149мм",
          unit: "0",
          quantity: "4.6",
          created_at: Date.now(),
          updated_at: Date.now(),
        },
        {
          id: 3,
          tags: "990117 саморез с пот. головкой 4,2*16 а2",
          vendorCode: "990117",
          itemName: "Саморез с пот. головкой 4,2*16 А2",
          unit: "1",
          quantity: "100",
          created_at: Date.now(),
          updated_at: Date.now(),
        },
      ]);
    });
};

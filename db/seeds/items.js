/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = function (knex) {
  // Deletes ALL existing entries

  return knex("items")
    .del()
    .then(() =>
      knex("items").insert([
        {
          id: 1,
          vendorCode: "010703",
          itemName: "Алюминиевый профиль закладная деталь для стойки",
          unit: "0",
          quantity: "6",
          createdBy: "1",
        },
        {
          id: 2,
          vendorCode: "432254",
          itemName: "Алюминиевый профиль стойка 149мм",
          unit: "0",
          quantity: "4.6",
          createdBy: "1",
        },
        {
          id: 3,
          vendorCode: "990117",
          itemName: "Саморез с пот. головкой 4,2*16 А2",
          unit: "1",
          quantity: "100",
          createdBy: "1",
        },
      ])
    )
    .then(() =>
      knex("users").insert([
        {
          name: "admin",
          login: "admin",
          pass: "admin",
          privelegies: "10",
        },
        {
          name: "Олег Василенко",
          login: "oleg",
          pass: "123",
          privelegies: "5",
        },
      ])
    );
};

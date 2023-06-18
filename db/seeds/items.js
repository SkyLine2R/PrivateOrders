const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = (knex) =>
  knex("items")
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
          updatedBy: 1,
        },
        {
          id: 2,
          vendorCode: "432254",
          itemName: "Алюминиевый профиль стойка 149мм",
          unit: "0",
          quantity: "4.6",
          createdBy: "1",
          updatedBy: 1,
        },
        {
          id: 3,
          vendorCode: "990117",
          itemName: "Саморез с пот. головкой 4,2*16 А2",
          unit: "1",
          quantity: "100",
          createdBy: "1",
          updatedBy: 1,
        },
      ])
    )
    .then(() =>
      knex("users")
        .del()
        .insert([
          {
            name: "admin",
            login: "admin",
            pass: bcrypt.hashSync("admin", 10),
            accessLevel: "5",
          },
          {
            name: "Олег Василенко",
            login: "oleg",
            pass: bcrypt.hashSync("123456", 10),
            accessLevel: "5",
          },
        ])
    )
    .then(() =>
      knex("customers")
        .del()
        .insert([
          {
            name: "Фасадные технологии",
            createdBy: 1,
            updatedBy: 1,
          },
          {
            name: "БиСиДи",
            createdBy: 2,
            updatedBy: 2,
          },
        ])
    );

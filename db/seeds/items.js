const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = (knex) =>
  knex("vendorCodes")
    .del()

    .then(() =>
      knex("users")
        .del()
        .insert([
          {
            name: "admin",
            login: "admin",
            pass: bcrypt.hashSync("admin", 10),
            accessLevel: "5",
            createdBy: "1",
            updatedBy: 1,
          },
          {
            name: "Олег Василенко",
            login: "oleg",
            pass: bcrypt.hashSync("123456", 10),
            accessLevel: "5",
            createdBy: "1",
            updatedBy: 1,
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
    )
    .then(() =>
      knex("units")
        .del()
        .insert([
          {
            name: "м / хл.",
            notes: "Метры / хлыст",
            createdBy: "1",
            updatedBy: 1,
          },
          {
            name: "шт. / уп.",
            notes: "Штуки / упаковка",
            createdBy: "1",
            updatedBy: 1,
          },
          {
            name: "м / уп.",
            notes: "Метры / упаковка",
            createdBy: "1",
            updatedBy: 1,
          },
        ])
    )
    .then(() =>
      knex("vendorCodes").insert([
        {
          id: 1,
          vendorCode: "010703",
          name: "Алюминиевый профиль закладная деталь для стойки",
          unit: "1",
          quantity: "6",
          createdBy: "1",
          updatedBy: 1,
        },
        {
          id: 2,
          vendorCode: "432254",
          name: "Алюминиевый профиль стойка 149мм",
          unit: "1",
          quantity: "4.6",
          createdBy: "1",
          updatedBy: 1,
        },
        {
          id: 3,
          vendorCode: "990117",
          name: "Саморез с пот. головкой 4,2*16 А2",
          unit: "2",
          quantity: "100",
          createdBy: "1",
          updatedBy: 1,
        },
      ])
    );

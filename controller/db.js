/* eslint-disable no-console */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
const knexConfig = require("../db/knexfile");
// eslint-disable-next-line import/order
const db = require("knex")(knexConfig[process.env.NODE_ENV]);

const dbSchemaVendorCode = require("../components/items-db_schema"); // объект для проверки ввода
const testDataFromForm = require("../components/testing-data-from-input"); // функция для проверки ввода

const regExpForFilter = /[^а-яё\d\w]/gi; // регулярка для запроса быстрого фильтра по артикулам

// -------- тестировщик запросов к БД
/* const query = db("users").whereExists(function () {
  this.select("login").where("login", "oleg");
});
query
  .then((items) => {
    console.log(items);
    return items;
  })
  .catch((err) => {
    console.log(`Ошибка при получении данных... ${err}`);
  }); */
// ------------

module.exports = DB = {
  // выборка записей для автофильтра
  filterRecords({ table, column, string }) {
    const searchData = `%${string}%`.replace(regExpForFilter, "%");

    return db(table)
      .whereLike(column, `%${searchData}%`)
      .orWhereLike(column, `%${searchData.split("%").reverse().join("%")}%`)
      .orWhereLike("notes", `%${searchData}%`)
      .orderBy(column, "asc");
  },
  // не строгий поиск записей по строке
  findLikeEntrie({ table, searchColumn, searchData }) {
    console.log(searchData);
    return db(table).whereLike(searchColumn, searchData).orderBy(searchColumn);
  },

  // строгий поиск записей по строке
  async findEntry({ table, searchColumn, searchData }) {
    return db(table).where(searchColumn, searchData);
  },

  async addEntry1({ table, dataObj }) {
    return db(table).insert(dataObj);
  },

  async addEntry(insertData) {
    const obj = await testDataFromForm(dbSchemaVendorCode, insertData);

    if (obj.error) return obj;

    return {
      id: await db("items").insert(obj),
      vendorCode: obj.vendorCode,
    };
  },

  async getAllEntries(table, columns) {
    console.log(columns);
    return db
      .column(...columns)
      .select()
      .from(table);
  },

  delete(id) {
    return db("items").del().where({ id });
  },
};

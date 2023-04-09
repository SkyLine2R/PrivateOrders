/* eslint-disable no-console */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
const knexConfig = require("./db/knexfile");
// eslint-disable-next-line import/order
const db = require("knex")(knexConfig[process.env.NODE_ENV]);

const dbSchemaVendorCode = require("./components/items-db_schema"); // объект для проверки ввода
const testDataFromForm = require("./components/testing-data-from-input"); // функция для проверки ввода

const regExpForFilter = /[^а-яё\d\w]/gi; // регулярка для запроса быстрого фильтра по артикулам

// тестировщик запросов к БД
/* const query = db("items").whereLike("vendorСode", "%99%");
query
  .then((items) => {
    console.log(items);
    return items;
  })
  .catch((err) => {
    console.log(`Ошибка при получении данных... ${err}`);
  }); */

module.exports = Items = {
  // выборка записей для автофильтра
  filterRecords({ table, column, string }) {
    console.log(table);
    console.log("выборка для автофильтра");
    const searchColumn = column === "vendorCode" ? "vendorCode" : "tags";
    const searchData = `%${string}%`
      .replace(regExpForFilter, "%")
      .toLowerCase();
    return db(table)
      .whereLike(searchColumn, `%${searchData}%`)
      .orWhereLike(
        searchColumn,
        `%${searchData.split("%").reverse().join("%")}%`
      )
      .orderBy(searchColumn);
  },

  findEntry({ table, searchColumn, searchData }) {
    console.log(searchData);
    return db(table).whereLike(searchColumn, searchData).orderBy(searchColumn);
  },
  async addEntry(insertData) {
    const obj = await testDataFromForm(dbSchemaVendorCode, insertData.data);
    if (obj.error) return obj;

    const tags = `${obj.vendorCode.toLowerCase()} ${obj.itemName.toLowerCase()} ${
      obj.notes.toLowerCase() || ""
    }`;

    return {
      id: await db("items").insert({
        ...obj,
        tags,
        created_at: Date.now(),
      }),
      vendorCode: obj.vendorCode,
    };
  },
  delete(id) {
    return db("items").del().where({ id });
  },
};

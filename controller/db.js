/* eslint-disable no-console */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
const knexConfig = require("../db/knexfile");
// eslint-disable-next-line import/order
const db = require("knex")(knexConfig[process.env.NODE_ENV]);

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

  async addEntry({ table, dataObj, resp }) {
    return db(table).returning(resp).insert(dataObj);
  },

  async editEntry({ table, dataObj, resp }) {
    return db(table).returning(resp).where({ id: dataObj.id }).update(dataObj);
  },

  async getAllEntries(table, columns) {
    return db
      .column(...columns)
      .select()
      .from(table);
  },

  delete(id) {
    return db("items").del().where({ id });
  },
};

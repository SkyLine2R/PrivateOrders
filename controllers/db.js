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
  // выборка записей для автофильтра //
  async findEntriesForQuickFilter({ table, column, string, respCol }) {
    const searchData = `%${string}%`.replace(regExpForFilter, "%");
    return db(table)
      .returning(respCol)
      .whereLike(column, `%${searchData}%`)
      .orWhereLike(column, `%${searchData.split("%").reverse().join("%")}%`)
      .orWhereLike("notes", `%${searchData}%`)
      .orderBy(column, "asc");
  },

  // не строгий поиск записей по строке //
  findLikeEntries({ table, searchColumn, searchData }) {
    console.log(searchData);
    return db(table).whereLike(searchColumn, searchData).orderBy(searchColumn);
  },

  // строгий поиск записей по строке //
  async findEntries({ table, searchColumn, searchData, respCol }) {
    return db(table).select(respCol).where(searchColumn, searchData);
  },

  // добавить запись //
  async addEntry({ table, dataObj, respCol }) {
    return db(table).returning(respCol).insert(dataObj);
  },

  // редактировать запись //
  async editEntry({ table, dataObj, respCol }) {
    return db(table)
      .returning(respCol)
      .where({ id: dataObj.id })
      .update(dataObj);
  },

  // получить все записи //
  async getAllEntries({ table, respCol }) {
    return db
      .column(...respCol)
      .select()
      .from(table);
  },

  // удалить запись //
  delEntry({ table, id, respCol }) {
    return db(table).del(respCol).where({ id });
  },
};

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
  async findEntriesForQuickFilter({ table, columns, string, respCol }) {
    const primaryTable = await db(table)
      .column("table_name")
      .where("table_name", table)
      .select();
    /*     const foreignKeys = await db("information_schema.key_column_usage")
      .where("table_name", "=", primaryTable.table_name)
      .andWhere("referenced_table_name", "IS NOT", null)
      .select("referenced_table_name", "column_name", "referenced_column_name"); */
    console.log("primaryTable");
    console.log(primaryTable);
    /*     console.log("foreignKeys");
    console.log(foreignKeys); */

    const searchData = `%${string}%`.replace(regExpForFilter, "%");
    const reverseSearchData = `%${searchData.split("%").reverse().join("%")}%`;

    const searchQuery = db(table)
      .returning(respCol)
      .whereLike(columns[0], `%${searchData}%`)
      .orWhereLike(columns[0], reverseSearchData);

    if (columns.length >= 2) {
      columns.slice(1).forEach((column) => {
        searchQuery
          .orWhereLike(column, `%${searchData}%`)
          .orWhereLike(column, reverseSearchData);
      });
    }
    return searchQuery.orderBy(columns[0], "asc");
  },

  // не строгий поиск записей по строке //
  async findLikeEntries({ table, searchColumn, searchData }) {
    return db(table).whereILike(searchColumn, searchData).orderBy(searchColumn);
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
  delEntry({ table, id }) {
    return db(table).where({ id }).del();
  },
};

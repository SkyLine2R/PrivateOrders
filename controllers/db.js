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
    const searchData = `%${string}%`.replace(regExpForFilter, "%");
    const reverseSearchData = `%${searchData.split("%").reverse().join("%")}%`;

    /*     const testSearchQuery = await db(table)
      // .returning(respCol)
      .returning(respCol)
      .from(table)
      .join("units", function () {
        this.on(table + ".id", "=", "units.id");
      })
      .select(`${table}.*`, "units.name as unit");

    console.log("testSearchQuery");
    console.log(testSearchQuery); */

    const searchQuery = db(table)
      .returning(respCol)
      .whereLike(columns[0], `%${searchData}%`)
      .orWhereLike(columns[0], reverseSearchData);
    // поиск в дополнительных колонках
    if (columns.length >= 2) {
      columns.slice(1).forEach((column) => {
        searchQuery
          .orWhereLike(column, `%${searchData}%`)
          .orWhereLike(column, reverseSearchData);
      });
    }
    // проверим наличие связанных колонок и подтащим данные из них
    respCol.forEach(async (column) => {
      const tableName = column + "s";
      const tableExists = await db.schema.hasTable(tableName);

      if (tableExists && tableName !== table) {
        console.log("searchQuery run");
        searchQuery
          .join(tableName, function () {
            this.on(table + ".unit", "=", tableName + ".id");
          })
          .select(`${table}.*`, `${tableName}.name as ${column}`);
      }
    });

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

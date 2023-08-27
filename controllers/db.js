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

// проверка связанных колонок и замена данных (ID на текстовые значения)
async function joinAdditionData({ respCol, table, searchQuery }) {
  console.log(respCol);
  respCol.forEach(async (column) => {
    const tableName = column + "s";
    const tableExists = await db.schema.hasTable(tableName);
    if (tableExists && tableName !== table) {
      searchQuery
        .join(tableName, function () {
          this.on(table + "." + column, "=", tableName + ".id");
        })
        .select(`${table}.*`, `${tableName}.name as ${column}`);
    }
  });
  console.log("searchQuery1");
  console.log(await searchQuery);
  return searchQuery;
}

module.exports = DB = {
  // выборка записей для автофильтра //
  async findEntriesForQuickFilter({ table, columns, string, respCol }) {
    const searchData = `%${string}%`.replace(regExpForFilter, "%");
    const reverseSearchData = `${searchData.split("%").reverse().join("%")}`;

    const searchQuery = db(table)
      .returning(respCol)
      .whereLike(`${table}.${columns[0]}`, searchData)
      .orWhereLike(`${table}.${columns[0]}`, reverseSearchData);
    // поиск в дополнительных колонках
    if (columns.length >= 2) {
      columns.slice(1).forEach((column) => {
        searchQuery
          .orWhereLike(`${table}.${column}`, searchData)
          .orWhereLike(`${table}.${column}`, reverseSearchData);
      });
    }
    // проверим наличие связанных колонок и заменим данные ID на текстовые значения
    joinAdditionData({ respCol, table, searchQuery });

    return searchQuery.orderBy(columns[0], "asc");
  },

  // не строгий поиск записей по строке //
  async findLikeEntries({ table, searchColumn, searchData }) {
    return db(table).whereILike(searchColumn, searchData).orderBy(searchColumn);
  },

  // строгий поиск записей по строке //
  async findEntries({ table, searchData, respCol }) {
    return db(table).where(searchData).select(respCol);
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
  async getAllEntries({ table, respCol, customer }) {
    const searchQuery = db(table).returning(respCol).select();

    if (customer) {
      searchQuery.where({ customer });
    }

    joinAdditionData({ respCol, table, searchQuery });

    return searchQuery;
  },

  // получить все записи //
  async getAllEntries2({ table, respCol, customer }) {
    try {
      const searchQuery = db
        .select(respCol)
        .from(table)
        .where({ customer })
        .join("vendorCodes", "stock.vendorCode", "vendorCodes.id")
        .join("units", "vendorCodes.unit", "units.id");
      console.log(await searchQuery);
      return searchQuery;
    } catch (e) {
      console.log(e);
    }
    /*     if (customer) {
      searchQuery.where({ customer });
    }

    joinAdditionData({ respCol, table, searchQuery });
    console.log("searchQuery");
    console.log(await searchQuery); */
    return searchQuery;
  },

  // удалить запись //
  delEntry({ table, id }) {
    return db(table).where({ id }).del();
  },
};

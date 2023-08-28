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

  // второй вариант для выборки записей для автофильтра //
  async findEntriesForQuickFilter2({ table, columns, string, respCol }) {
    const searchData = `%${string}%`.replace(regExpForFilter, "%");
    const reverseSearchData = `${searchData.split("%").reverse().join("%")}`;

    const searchQuery = db
      .select(respCol)
      .from(table)
      .leftJoin("vendorCodes", "stock.vendorCode", "vendorCodes.id")
      .leftJoin("colors", "stock.color", "colors.id")
      .leftJoin("units", "vendorCodes.unit", "units.id")
      .where(function () {
        this.where("vendorCodes.name", "like", `%${searchData}%`).orWhere(
          "vendorCodes.name",
          "like",
          `%${reverseSearchData}%`
        );
      });

    return searchQuery;
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

  // обновить количество материала

  async changeAmount({ table, id, addAmount, respCol }) {
    db(table)
      .select("amount")
      .where("id", id)
      .first()
      .then((row) => {
        if (row) {
          const currentAmount = row.amount;
          const updatedAmount = currentAmount + addAmount;
          if (updatedAmount >= 0) {
            return knex(table).where("id", id).update("amount", updatedAmount);
          } else {
            throw new Error("Недостаточно материала");
          }
        } else {
          throw new Error("Запись с указанным идентификатором не найдена");
        }
      })
      .then(() => {
        console.log("Значение успешно обновлено");
      })
      .catch((error) => {
        console.error("Ошибка при обновлении значения:", error);
      });
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
        .leftJoin("vendorCodes", "stock.vendorCode", "vendorCodes.id")
        .leftJoin("units", "vendorCodes.unit", "units.id")
        .leftJoin("colors", "stock.color", "colors.id");
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

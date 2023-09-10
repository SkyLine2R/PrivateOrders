/* eslint-disable func-names */
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

// База для поискового запроса по Stock
//
async function addBaseForStockSearchQuery({ searchQuery, respCol, customer }) {
  return searchQuery
    .select(respCol)
    .where({ customer })
    .leftJoin("vendorCodes", "stock.vendorCode", "vendorCodes.id")
    .leftJoin("units", "vendorCodes.unit", "units.id")
    .leftJoin("colors", "stock.color", "colors.id");
}

// проверка связанных колонок
// и замена данных (ID на текстовые значения)
//
function joinAdditionData({ respCol, table, searchQuery }) {
  respCol.forEach(async (column) => {
    const tableName = column + "s";
    const tableExists =
      tableName !== table ? await db.schema.hasTable(tableName) : false;
    if (tableExists) {
      searchQuery
        .join(tableName, function () {
          this.on(table + "." + column, "=", tableName + ".id");
        })
        .select(`${table}.*`, `${tableName}.name as ${column}`);
    }
  });
  return searchQuery;
}

// добавление нужного количества запросов like
// для нескольких колонок из массива
//
async function addLikeInQuerys({
  table = "vendorCodes",
  searchQuery,
  columns,
  string,
}) {
  const searchData = `%${string}%`.replace(regExpForFilter, "%");
  const reverseSearchData = `${searchData.split("%").reverse().join("%")}`;

  searchQuery
    .whereLike(`${table}.${columns[0]}`, searchData)
    .orWhereLike(`${table}.${columns[0]}`, reverseSearchData);
  // если передано более 1 колонки - добавляются в поиск
  if (columns.length >= 2) {
    columns.slice(1).forEach((column) => {
      searchQuery
        .orWhereLike(`${table}.${column}`, searchData)
        .orWhereLike(`${table}.${column}`, reverseSearchData);
    });
  }
  return searchQuery;
}

module.exports = DB = {
  // получить все записи со склада
  // + подставить данные со связанных колонок
  //
  async getAllEntries2({ table, respCol, customer }) {
    const searchQuery = db(table);
    addBaseForStockSearchQuery({ searchQuery, respCol, customer });
    return searchQuery;
  },

  // выборка записей для автофильтра с подстановкой связанных данных
  // если столбец называется color и в БД есть таблица colors -
  // автоматически подтаскивается столбец colors.name и т.д.
  //
  async findEntriesForQuickFilter({ table, columns, string, respCol }) {
    const searchQuery = db(table).returning(respCol);
    addLikeInQuerys({ searchQuery, table, columns, string });
    joinAdditionData({ respCol, table, searchQuery });

    return searchQuery.orderBy(columns[0], "asc");
  },

  // автофильтр для выборки записей со склада с более сложной структурой
  //
  async findEntriesForQuickFilterForStock({
    table,
    columns,
    string,
    respCol,
    customer,
  }) {
    const searchQuery = db(table);
    addBaseForStockSearchQuery({
      searchQuery,
      respCol,
      customer,
    });

    addLikeInQuerys({ searchQuery, columns, string });

    return searchQuery;
  },

  // простой не строгий поиск записей по строке
  //
  async findLikeEntries({ table, searchColumn, searchData }) {
    return db(table).whereILike(searchColumn, searchData).orderBy(searchColumn);
  },

  // строгий поиск записей по строке
  //
  async findEntries({ table, searchData, respCol }) {
    return db(table).where(searchData).select(respCol);
  },

  // добавить запись
  //
  async addEntry({ table, dataObj, respCol }) {
    return db(table).returning(respCol).insert(dataObj);
  },

  // редактировать запись
  //
  async editEntry({ table, dataObj, respCol }) {
    return db(table)
      .returning(respCol)
      .where({ id: dataObj.id })
      .update(dataObj);
  },

  // обновить количество материала
  //
  // eslint-disable-next-line no-unused-vars
  async changeAmount({ table, id, addAmount, respCol }) {
    return db(table)
      .select("amount")
      .where("id", id)
      .first()
      .then((row) => {
        if (!row) throw new Error("Произошла непредвиденная ошибка");
        const updatedAmount = +row.amount + addAmount;
        if (updatedAmount < 0)
          throw new Error("Ошибка. Недостаточно материала");
        return db(table).where("id", id).update("amount", updatedAmount);
      })
      .then(() => "Материал добавлен")
      .catch((error) => ({ error }));
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

  // удалить запись //
  delEntry({ table, id }) {
    return db(table).where({ id }).del();
  },
};

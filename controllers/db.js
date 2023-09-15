/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
const knexConfig = require("../db/knexfile");
// eslint-disable-next-line import/order
const db = require("knex")(knexConfig[process.env.NODE_ENV]);
const tableDependencies = require("./dependeciesTableDB");
// регулярка для запроса быстрого фильтра по артикулам
const regExpForFilter = /[^а-яё\d\w]/gi;

// База запроса по записям с подстановкой зависимых таблиц
//
async function createBaseQueryWithLeftJoin({
  searchQuery,
  table,
  respCol,
  customer,
}) {
  searchQuery.select(respCol);
  if (customer) searchQuery.where({ customer });
  if (table === "colors") return searchQuery;

  let current = table;
  while (Object.prototype.hasOwnProperty.call(tableDependencies, current)) {
    const { next, dependencies } = tableDependencies[current];
    searchQuery.leftJoin(next, dependencies[0], dependencies[1]);
    current = next;
  }
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
  if (columns.length < 2) return searchQuery;

  columns.slice(1).forEach((column) => {
    searchQuery
      .orWhereLike(`${table}.${column}`, searchData)
      .orWhereLike(`${table}.${column}`, reverseSearchData);
  });
  return searchQuery;
}

module.exports = DB = {
  // получить все записи, при необходимости
  // подставить данные со связанных колонок
  //
  async getAllEntries({ table, respCol, customer }) {
    const searchQuery = db(table);
    createBaseQueryWithLeftJoin({ searchQuery, table, respCol, customer });
    return searchQuery;
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
    createBaseQueryWithLeftJoin({ searchQuery, table, respCol, customer });
    addLikeInQuerys({ searchQuery, /* table, */ columns, string });

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
  async addEntry({ table, dataObj, respCol = ["id"] }) {
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

  // удалить запись //
  delEntry({ table, id }) {
    return db(table).where({ id }).del();
  },
};

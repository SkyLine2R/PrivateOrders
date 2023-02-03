const knexConfig = require("./db/knexfile");
const db = require("knex")(knexConfig[process.env.NODE_ENV]);
const testFormForInputItem = require("./components/items-db_schema.js"); //объект для проверки ввода
const testDataFromForm = require("./components/testing-data-from-input.js"); //функция для проверки ввода
//тестировщик запросов к БД
/* const query = db("items").whereLike("vendorСode", "%99%");
query
  .then((items) => {
    console.log(items);
    return items;
  })
  .catch((err) => {
    console.log(`Ошибка при получении данных... ${err}`);
  }); */

module.exports = Item = {
  //выборка записей для фильтра по маске
  //
  filterRecords({ table, column, data }) {
    console.log(table + " " + column + " " + `%${data}%`);
    return db(table)
      .whereLike(column, `%${data}%`)
      .orWhereLike(column, `%${data.split("%").reverse().join("%")}%`)
      .orderBy(column);
  },

  findEntry({ table, column, data }) {
    console.log(data);
    return db(table).whereLike(column, data).orderBy(column);
  },
  addEntry(data) {
    console.log(data);
    return { sucsess: true }; //db("items").insert(data);
  },
  delete(id) {
    return db("items").del().where({ id });
  },
};

//module.exports = db;

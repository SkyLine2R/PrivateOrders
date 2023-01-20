const knexConfig = require("./db/knexfile");
const db = require("knex")(knexConfig[process.env.NODE_ENV]);

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
  findRecords(value, column) {
    console.log(column + " " + value);
    console.log(db);
    return db("items").whereLike(column, `%${value}%`).orderBy(column);
  },
  findItemName(vendorСode) {
    return db("items")
      .whereLike("itemName", `%${itemName}%`)
      .orderBy("itemName");
  },
  create(data) {
    return db("items").insert(data);
  },
  delete(id) {
    return db("items").del().where({ id });
  },
};

//module.exports = db;

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
  findVendorСode(vendorСode) {
    return db("items").whereLike("vendorСode", `%${vendorСode}%`);
  },
  create(data) {
    return db("items").insert(data);
  },
  delete(id) {
    return db("items").del().where({ id });
  },
};

//module.exports = db;

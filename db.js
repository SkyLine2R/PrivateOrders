const knexConfig = require("./db/knexfile");
const db = require("knex")(knexConfig[process.env.NODE_ENV]);

module.exports = Item = {
  all() {
    return db("items");
  },
  findVendorСode(vendorСode) {
    return db("items").where({ vendorСode }).first();
  },
  create(data) {
    return db("items").insert(data);
  },
  delete(id) {
    return db("items").del().where({ id });
  },
};

module.exports = db;

/* eslint-disable consistent-return */
const DB = require("./db");
const itemsDbSchema = require("../components/vendor-codes-db_schema");
const testingDataFromInput = require("../components/testing-data-from-input");

// class authController {}

async function getAll(req, res) {
  try {
    const resp = await DB.getAllEntries({
      table: "items",
      respCol: ["id", "vendorCode", "itemName", "unit", "quantity", "notes"],
    });
    return res.json(resp);
  } catch (e) {
    res.status(400).json({ error: "Ошибка БД при получении артикулов" });
  }
}

async function getFiltered(req, res) {
  try {
    const resp = await DB.findEntriesForQuickFilter({
      ...req.body.data,
      table: "items",
      respCol: ["id", "vendorCode", "itemName", "unit", "quantity", "notes"],
    });
    return res.json(resp);
  } catch (e) {
    res.status(400).json({ error: "Ошибка БД при получении артикулов" });
  }
}

async function add(req, res) {
  try {
    const itemData = testingDataFromInput(itemsDbSchema, req.body.data);
    if (itemData.error) return res.json(itemData.error);

    const item = (
      await DB.addEntry({
        table: "items",
        dataObj: { ...itemData, createdBy: 1 }, // createdBy - сделать подстановку имени пользователя
        respCol: ["id", "vendorCode"],
      })
    )[0];

    return res.json(item);
  } catch (e) {
    res.status(400).json({ error: "Ошибка при добавлении артикула" });
  }
}

module.exports = {
  getFiltered,
  getAll,
  add,
};

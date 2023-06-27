/* eslint-disable consistent-return */
const DB = require("./db");
const itemsDbSchema = require("../components/db_schema_for_testing/db_schema-vendor-codes");
const testingDataFromInput = require("../components/testing-data-from-input");

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
        dataObj: {
          ...itemData,
          createdBy: req.auth.id,
          updatedBy: req.auth.id,
        },
        respCol: ["id", "vendorCode"],
      })
    )[0];

    return res.json(item);
  } catch (e) {
    res.status(400).json({ error: "Ошибка при добавлении артикула" });
  }
}

async function edit(req, res) {
  try {
    const itemData = testingDataFromInput(
      { ...itemsDbSchema, id: null },
      req.body.data
    );

    if (itemData.error) return res.json(itemData.error);

    const item = (
      await DB.editEntry({
        table: "items",
        dataObj: {
          ...itemData,
          updatedBy: req.auth.id,
          updatedAt: new Date(Date.now()).toLocaleString(),
        },
        respCol: ["id", "vendorCode"],
      })
    )[0];

    return res.json(item);
  } catch (e) {
    res.status(400).json({ error: "Ошибка при изменении данных артикула" });
  }
}

module.exports = {
  getFiltered,
  getAll,
  add,
  edit,
};
/* eslint-disable consistent-return */
const DB = require("./db");
const vendorCodesDbSchema = require("../components/db_schema_for_testing/db_schema-vendor-codes");
const testingDataFromInput = require("../components/testing-data-from-input");

const table = "vendorCodes";
const respCol = ["id", "vendorCode", "name", "unit", "quantity", "notes"];

async function getAll(req, res) {
  try {
    const resp = await DB.getAllEntries({
      table,
      respCol,
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
      table,
      respCol,
    });
    return res.json(resp);
  } catch (e) {
    res.status(400).json({ error: "Ошибка БД при получении артикулов" });
  }
}

async function add(req, res) {
  try {
    const itemData = testingDataFromInput(vendorCodesDbSchema, req.body.data);
    if (itemData.error) return res.json(itemData.error);

    const item = (
      await DB.addEntry({
        table,
        dataObj: {
          ...itemData,
          createdBy: req.auth.id,
          updatedBy: req.auth.id,
        },
        respCol,
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
      { ...vendorCodesDbSchema, id: null },
      req.body.data
    );

    if (itemData.error) return res.json(itemData.error);

    const item = (
      await DB.editEntry({
        table,
        dataObj: {
          ...itemData,
          updatedBy: req.auth.id,
          updatedAt: Date.now(),
        },
        respCol,
      })
    )[0];

    return res.json(item);
  } catch (e) {
    res.status(400).json({ error: "Ошибка при изменении данных артикула" });
  }
}

async function del(req, res) {
  try {
    const item = await DB.delEntry({
      table,
      id: req.body.data.id,
    });
    return res.json(item);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(400).json({ error: "Ошибка при удалении записи" });
  }
}

module.exports = {
  getFiltered,
  getAll,
  edit,
  add,
  del,
};

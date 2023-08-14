/* eslint-disable consistent-return */
const DB = require("./db");
const vendorCodesDbSchema = require("../components/db_schema_for_testing/db_schema-vendor-codes");
const testingDataFromInput = require("../components/testing-data-from-input");

const table = "stock";
const respCol = [
  "stock.id",
  "vendorCodes.vendorCode",
  "vendorCodes.name",
  "vendorCodes.unit",
  "units.name as unit",
  "vendorCodes.quantity",
  "stock.color",
  "stock.amount",
];
const addCol = [
  "vendorCodes.vendorCode",
  "vendorCodes.name",
  "vendorCodes.unit",
  "vendorCodes.quantity",
  "amount",
  "notes",
];

async function getAll(req, res) {
  try {
    console.log("DB.getAllEntries2");
    const resp = await DB.getAllEntries2({
      table,
      respCol,
      customer: req.body.customer,
    });
    console.log("resp");
    console.log(resp);
    return res.json(resp);
  } catch (e) {
    res.status(400).json({ error: "Ошибка БД при получении материалов" });
  }
}

async function getFiltered(req, res) {
  try {
    const resp = await DB.__findEntriesForQuickFilter({
      ...req.body.data,
      table,
      respCol,
    });
    return res.json(resp);
  } catch (e) {
    res.status(400).json({ error: "Ошибка БД при получении материалов" });
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
        respCol: ["id", "vendorCode"],
      })
    )[0];

    return res.json(item);
  } catch (e) {
    res.status(400).json({ error: "Ошибка при добавлении материалов" });
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
        respCol: ["id", "vendorCode"],
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
  add,
  edit,
  del,
};

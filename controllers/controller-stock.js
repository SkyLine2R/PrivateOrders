/* eslint-disable consistent-return */
const DB = require("./db");
const dbSchema = require("../components/db_schema_for_testing/db_schema-in-out-stock");
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
  "colors.name as colorName",
];
const addCol = [
  "vendorCodes.vendorCode",
  "vendorCodes.name",
  "vendorCodes.unit",
  "vendorCodes.quantity",
  "amount",
  "notes",
];

const joinCol = [[]];

async function getAll(req, res) {
  try {
    const resp = await DB.getAllEntries2({
      table,
      respCol,
      customer: req.body.customer,
    });
    return res.json(resp);
  } catch (e) {
    res.status(400).json({ error: "Ошибка БД при получении материалов" });
  }
}

async function getFiltered(req, res) {
  try {
    const resp = await DB.findEntriesForQuickFilter2({
      ...req.body.data,
      table,
      respCol,
    });
    return res.json(resp);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Ошибка БД при получении материалов" });
  }
}

async function add(req, res) {
  try {
    const itemData = testingDataFromInput(dbSchema, req.body.data);
    if (itemData.error) return res.json(itemData.error);

    console.log("stockController");
    console.log(req.body.data);

    if (!req.body?.data?.stockId) {
      const materialInDb = (
        await DB.findEntries({
          table,
          searchData: {
            customer: req.body.customer,
            vendorCode: req.body.data.vendorCodeId,
            color: +req.body.data.stockColor || null,
          },
          respCol: "id",
        })
      )[0];
      console.log("materialInDb");
      console.log(materialInDb);
      if (materialInDb) req.body.data.stockId = materialInDb;
    }
    if (!req.body?.data?.stockId) {
      const itemId = await DB.addEntry({
        table,
        dataObj: {
          customer: req.body.customer,
          vendorCode: req.body.data.vendorCodeId,
          color: +req.body.data.stockColor || null,
          amount: req.body.data.stockAmount,
          createdBy: req.auth.id,
          updatedBy: req.auth.id,
        },
        respCol: ["id"],
      });
      console.log("itemId");
      console.log(itemId);
      req.body.data.stockId = itemId;
    } else {
      const upd = await DB.changeAmount({
        table,
        id: req.body.data.stockId,
        addAmount: req.body.data.amount,
      });
      console.log(upd);
    }

    return res.json("item");
  } catch (e) {
    console.log(e);
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

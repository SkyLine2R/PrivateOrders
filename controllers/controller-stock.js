/* eslint-disable consistent-return */
const DB = require("./db");
const testingDataFromInput = require("../components/testing-data-from-input");

const table = "stock";
const respCol = [
  "stock.id",
  "vendorCodes.vendorCode",
  "vendorCodes.name",
  "vendorCodes.unit",
  "vendorCodes.quantity",
  "units.name as unit",
  "stock.color",
  "stock.amount",
  "colors.name as colorName",
];

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
    const resp = await DB.findEntriesForQuickFilterForStock({
      ...req.body.data,
      table,
      respCol,
      customer: req.body.customer,
    });
    return res.json(resp);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Ошибка БД при получении материалов" });
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
  edit,
  del,
};

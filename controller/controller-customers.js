/* eslint-disable consistent-return */
const DB = require("./db");
const itemsDbSchema = require("../components/customers-db_schema");
const testingDataFromInput = require("../components/testing-data-from-input");

async function getAll(req, res) {
  try {
    const resp = await DB.getAllEntries({
      table: "customers",
      respCol: ["id", "name", "notes"],
    });
    return res.json(resp);
  } catch (e) {
    res.status(400).json({ error: "Ошибка БД при получении заказчиков" });
  }
}

async function add(req, res) {
  try {
    const itemData = testingDataFromInput(itemsDbSchema, req.body.data);
    if (itemData.error) return res.json(itemData.error);

    const item = (
      await DB.addEntry({
        table: "customers",
        dataObj: {
          ...itemData,
          createdBy: req.auth.id,
          updatedBy: req.auth.id,
        },
        respCol: ["id", "name"],
      })
    )[0];

    return res.json(item);
  } catch (e) {
    res.status(400).json({ error: "Ошибка при добавлении заказчика" });
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
        table: "customers",
        dataObj: {
          ...itemData,
          updatedBy: req.auth.id,
          updatedAt: Date.now(),
        }, // добавить подстановку ID редактировавшего
        respCol: ["id", "name"],
      })
    )[0];

    return res.json(item);
  } catch (e) {
    res.status(400).json({ error: "Ошибка при изменении данных заказчика" });
  }
}

module.exports = {
  getAll,
  add,
  edit,
};

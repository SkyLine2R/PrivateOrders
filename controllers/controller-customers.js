/* eslint-disable consistent-return */
const DB = require("./db");
const itemsDbSchema = require("../components/db_schema_for_testing/db_schema-customers");
const testingDataFromInput = require("../components/testing-data-from-input");

const table = "customers";

async function getAll(req, res) {
  try {
    const resp = await DB.getAllEntries({
      table,
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
    const [item] = 
      await DB.addEntry({
        table,
        dataObj: {
          ...itemData,
          createdBy: req.auth.id,
          updatedBy: req.auth.id,
        },
        respCol: ["id", "name"],
      })
   

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

    const [item] = 
      await DB.editEntry({
        table,
        dataObj: {
          ...itemData,
          updatedBy: req.auth.id,
          updatedAt: Date.now(),
        },
        respCol: ["id", "name"],
      })
    

    return res.json(item);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(400).json({ error: "Ошибка при изменении данных заказчика" });
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
    let msg = "Ошибка при удалении записи";
    if (e.errno === 19)
      msg =
        "Невозможно удалить запись, т.к. на неё ссылаются внешние ключи. Сначала удалите связанные данные";
    res.status(400).json({ error: msg });
  }
}

module.exports = {
  getAll,
  add,
  edit,
  del,
};

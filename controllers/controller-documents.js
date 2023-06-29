/* eslint-disable consistent-return */
const DB = require("./db");
const itemsDbSchema = require("../components/db_schema_for_testing/db_schema-document");
const testingDataFromInput = require("../components/testing-data-from-input");

async function getAll(req, res) {
  try {
    const resp = await DB.findEntries({
      table: req.body.table,
      respCol: ["id", "name", "number", "date", "notes"],
      searchColumn: "customer",
      searchData: req.body.customer,
    });

    return res.json(resp);
  } catch (e) {
    res.status(400).json({ error: "Ошибка БД при получении документов" });
  }
}

async function add(req, res) {
  try {
    const itemData = testingDataFromInput(itemsDbSchema, req.body.data);

    if (itemData.error) return res.status(400).json({ error: itemData.error });

    const item = (
      await DB.addEntry({
        table: req.body.table,
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
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(400).json({ error: "Ошибка при добавлении документа" });
  }
}

async function edit(req, res) {
  try {
    const itemData = testingDataFromInput(
      { ...itemsDbSchema, id: null },
      req.body.data
    );

    if (itemData.error) return res.status(400).json({ error: itemData.error });

    const item = (
      await DB.editEntry({
        table: req.body.table,
        dataObj: {
          ...itemData,
          updatedBy: req.auth.id,
          updatedAt: Date.now(),
        },
        respCol: ["id", "name"],
      })
    )[0];

    return res.json(item);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Ошибка при изменении реквизитов документа" });
  }
}

async function del(req, res) {
  try {
    const item = await DB.delEntry({
      table: req.body.table,
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
  getAll,
  add,
  edit,
  del,
};

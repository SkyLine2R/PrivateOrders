/* eslint-disable consistent-return */
const DB = require("./db");
const itemsDbSchema = require("../components/colors-db_schema");
const testingDataFromInput = require("../components/testing-data-from-input");

const table = "colors";

async function getAll(req, res) {
  try {
    const resp = await DB.getAllEntries({
      table,
      respCol: ["id", "name", "notes"],
    });
    return res.json(resp);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Ошибка БД при получении каталога цветов" });
  }
}

async function add(req, res) {
  try {
    const itemData = testingDataFromInput(itemsDbSchema, req.body.data);
    if (itemData.error) return res.json(itemData.error);

    const candidate = await DB.findEntry({
      table,
      searchColumn: "name",
      searchData: itemData.name,
    });

    if (candidate.length) {
      return res.json({
        error: "Не добавлен. Такой цвет уже представлен в базе.",
      });
    }

    const item = (
      await DB.addEntry({
        table,
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
    res.status(400).json({ error: "Ошибка при добавлении цвета в каталог" });
  }
}

async function edit(req, res) {
  try {
    const itemData = testingDataFromInput(
      { ...itemsDbSchema, id: null },
      req.body.data
    );

    if (itemData.error) return res.json(itemData.error);

    const candidate = await DB.findEntry({
      table,
      searchColumn: "name",
      searchData: itemData.name,
    });

    if (candidate.length && candidate[0].id !== itemData.id) {
      return res.json({
        error: "Не добавлен. Цвет с таким названием уже представлен в базе.",
      });
    }

    const item = (
      await DB.editEntry({
        table,
        dataObj: {
          ...itemData,
          updatedBy: req.auth.id,
          updatedAt: new Date(Date.now()).toLocaleString(),
        },
        respCol: ["id", "name"],
      })
    )[0];

    return res.json(item);
  } catch (e) {
    res.status(400).json({ error: "Не удалось изменить запись о цвете" });
  }
}

module.exports = {
  getAll,
  add,
  edit,
};

const DB = require("./db");

const table = "units";

async function getAll(req, res) {
  try {
    console.log(table);
    const resp = await DB.getAllEntries({
      table,
      respCol: ["id", "name", "notes"],
    });
    return res.json(resp);
  } catch (e) {
    return res
      .status(400)
      .json({ error: "Ошибка БД при получении списка единиц номенклатуры" });
  }
}

module.exports = { getAll };

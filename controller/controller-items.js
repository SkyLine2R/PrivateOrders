/* eslint-disable consistent-return */
const DB = require("./db");
const itemsDbSchema = require("../components/items-db_schema");
const testingDataFromInput = require("../components/testing-data-from-input");

// class authController {}

async function getFiltered(req, res) {
  try {
    const resp = await DB.findEntriesForQuickFilter({
      ...req.body.data,
      table: "items",
      respCol: ["id", "vendorCode", "itemName", "unit", "quantity", "notes"],
    });
    return res.json(resp);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: "Ошибка БД при получении списка пользователей" });
  }
}

async function add(req, res) {
  try {
    const itemData = testingDataFromInput(itemsDbSchema, req.body.data);
    console.log(itemData);
    if (itemData.error) return res.json(itemData.error);

    const item = (
      await DB.addEntry({
        table: "items",
        dataObj: { ...itemData, createdBy: 1 }, // createdBy - сделать подстановку имени пользователя
        respCol: ["id", "vendorCode"],
      })
    )[0];
    console.log(item);
    return res.json(item);
  } catch (e) {
    res.status(400).json({ error: "Ошибка при добавлении артикула" });
  }
}
async function editUser(req, res) {
  try {
    const userData = testingDataFromInput(
      { ...usersDbSchema, pass: null },
      req.body.data
    );

    if (userData.error) return res.json(userData.error);

    const candidate = await DB.findEntry({
      table: "users",
      searchColumn: "login",
      searchData: userData.login,
    });

    if (candidate.length && candidate[0].id !== userData.id) {
      return res.json({
        error: "Пользователь с таким логином уже существует",
      });
    }

    const { login } = (
      await DB.editEntry({
        table: "users",
        dataObj: { ...userData },
        resp: ["id", "login"],
      })
    )[0];
    console.log("login");
    console.log(login);
    return res.json({ login });
  } catch (e) {
    res.status(400).json({ error: "Ошибка при изменении данных пользователя" });
  }
}

async function changePass(req, res) {
  try {
    const userData = testingDataFromInput(
      { pass: usersDbSchema.pass },
      req.body.data
    );

    if (userData.error) return res.json(userData.error);

    const hashPass = await bcrypt.hash(userData.pass, 10);

    const { login } = (
      await DB.editEntry({
        table: "users",
        dataObj: { ...userData, pass: hashPass },
        resp: ["id", "login"],
      })
    )[0];

    return res.json({ login });
  } catch (e) {
    res.status(400).json({ error: "Ошибка при изменении пароля пользователя" });
  }
}

async function disableUser(req, res) {
  try {
    const userData = testingDataFromInput(
      { accessLevel: usersDbSchema.accessLevel },
      req.body.data
    );

    if (userData.error) return res.json(userData.error);

    const { login } = (
      await DB.editEntry({
        table: "users",
        dataObj: { ...userData },
        resp: ["id", "login"],
      })
    )[0];

    return res.json({ login });
  } catch (e) {
    res
      .status(400)
      .json({ error: "Ошибка при отключении аккаунта пользователя" });
  }
}

module.exports = {
  getFiltered,
  add,
  editUser,
  changePass,
  disableUser,
};

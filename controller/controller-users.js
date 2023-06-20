/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const DB = require("./db");
const usersDbSchema = require("../components/users-db_schema");
const testingDataFromInput = require("../components/testing-data-from-input");

async function getAll(req, res) {
  try {
    const resp = await DB.getAllEntries({
      table: "users",
      respCol: ["id", "login", "name", "accessLevel", "createdAt"],
    });

    return res.json(resp);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Ошибка БД при получении списка пользователей" });
  }
}

async function add(req, res) {
  const table = "users";

  try {
    const userData = testingDataFromInput(usersDbSchema, req.body.data);

    if (userData.error) return res.json(userData.error);

    const candidate = await DB.findEntry({
      table,
      searchColumn: "login",
      searchData: userData.login,
    });

    if (candidate.length) {
      return res.json({
        error: "Пользователь с таким логином уже существует",
      });
    }

    const hashPass = await bcrypt.hash(userData.pass, 10);

    const login = (
      await DB.addEntry({
        table,
        dataObj: {
          ...userData,
          pass: hashPass,
          createdBy: req.auth.id,
          updatedBy: req.auth.id,
        },
        respCol: "login",
      })
    )[0];
    return res.json(login);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(400).json({ error: "Ошибка при добавлении пользователя" });
  }
}
async function edit(req, res) {
  try {
    const dataObj = req.body.data;
    delete dataObj.pass;
    delete dataObj.createdAt;

    const userData = testingDataFromInput(
      { ...usersDbSchema, pass: null },
      dataObj
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

    const login = (
      await DB.editEntry({
        table: "users",
        dataObj: {
          ...userData,
          updatedBy: req.auth.id,
          updatedAt: new Date(Date.now()).toLocaleString(),
        },
        respCol: "login",
      })
    )[0];
    return res.json(login);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
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

    const login = (
      await DB.editEntry({
        table: "users",
        dataObj: {
          ...userData,
          pass: hashPass,
          updatedBy: req.auth.id,
          updatedAt: new Date(Date.now()).toLocaleString(),
        },
        respCol: "login",
      })
    )[0];

    return res.json(login);
  } catch (e) {
    res.status(400).json({ error: "Ошибка при изменении пароля пользователя" });
  }
}

async function disable(req, res) {
  try {
    const userData = testingDataFromInput(
      { accessLevel: usersDbSchema.accessLevel },
      req.body.data
    );

    if (userData.error) return res.json(userData.error);

    const login = (
      await DB.editEntry({
        table: "users",
        dataObj: {
          ...userData,
          updatedBy: req.auth.id,
          updatedAt: new Date(Date.now()).toLocaleString(),
        },
        respCol: "login",
      })
    )[0];

    return res.json(login);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Ошибка при отключении аккаунта пользователя" });
  }
}

module.exports = { add, edit, changePass, disable, getAll };

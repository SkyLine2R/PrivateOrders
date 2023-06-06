/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const DB = require("./db");
const usersDbSchema = require("../components/users-db_schema");
const testingDataFromInput = require("../components/testing-data-from-input");

// class authController {}

async function getAllUsers(req, res) {
  try {
    const resp = await DB.getAllEntries("users", [
      "id",
      "login",
      "name",
      "accessLevel",
      "createdAt",
    ]);
    return res.json(resp);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Ошибка БД при получении списка пользователей" });
  }
}

async function addUser(req, res) {
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
        dataObj: { ...userData, pass: hashPass },
        respCol: "login",
      })
    )[0];
    return res.json(login);
  } catch (e) {
    res.status(400).json({ error: "Ошибка при добавлении пользователя" });
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

    const login = (
      await DB.editEntry({
        table: "users",
        dataObj: { ...userData },
        respCol: "login",
      })
    )[0];
    console.log(login);
    return res.json(login);
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

    const login = (
      await DB.editEntry({
        table: "users",
        dataObj: { ...userData, pass: hashPass },
        respCol: "login",
      })
    )[0];

    return res.json(login);
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

    const login = (
      await DB.editEntry({
        table: "users",
        dataObj: { ...userData },
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

module.exports = { addUser, editUser, changePass, disableUser, getAllUsers };

/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const DB = require("./db");
const usersDbSchema = require("../components/db_schema_for_testing/db_schema-users");
const testingDataFromInput = require("../components/testing-data-from-input");

const table = "users";

async function getAll(req, res) {
  try {
    const resp = await DB.getAllEntries({
      table,
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
  try {
    const userData = testingDataFromInput(usersDbSchema, req.body.data);

    if (userData.error) return res.status(400).json(userData.error);

    const candidate = await DB.findEntries({
      table,
      searchColumn: "login",
      searchData: userData.login,
    });

    if (candidate.length) {
      res.status(400).json({
        error: "Пользователь с таким логином уже существует",
      });
      return true;
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

    if (userData.error) return res.status(400).json(userData.error);

    const candidate = await DB.findEntries({
      table,
      searchColumn: "login",
      searchData: userData.login,
    });

    if (candidate.length && candidate[0].id !== userData.id) {
      return res.status(400).json({
        error: "Пользователь с таким логином уже существует",
      });
    }
    if (+req.body.data.id === 1 && +req.body.data.accessLevel < 5)
      return res.status(400).json({
        error: "Уровень доступа главного администратора не может быть понижен",
      });
    const login = (
      await DB.editEntry({
        table,
        dataObj: {
          ...userData,
          updatedBy: req.auth.id,
          updatedAt: Date.now(),
        },
        respCol: "login",
      })
    )[0];
    if (!login) throw Error("Не удалось обработать запрос");
    return res.json(login);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(400).json({ error: "Не удалось изменить данные пользователя" });
  }
}

async function changePass(req, res) {
  try {
    const userData = testingDataFromInput(
      { pass: usersDbSchema.pass },
      req.body.data
    );
    if (userData.error) return res.status(400).json(userData.error);

    const hashPass = await bcrypt.hash(userData.pass, 10);

    const login = (
      await DB.editEntry({
        table,
        dataObj: {
          ...userData,
          pass: hashPass,
          updatedBy: req.auth.id,
          updatedAt: Date.now(),
        },
        respCol: "login",
      })
    )[0];
    if (!login) throw Error("Не удалось обработать запрос");
    return res.json(login);
  } catch (e) {
    res.status(400).json({ error: "Не удалось изменить пароль пользователя." });
  }
}

async function disable(req, res) {
  try {
    const userData = testingDataFromInput(
      { accessLevel: usersDbSchema.accessLevel },
      req.body.data
    );

    if (userData.error) return res.status(400).json(userData.error);

    if (+req.body.data.id === 1)
      return res.status(400).json({
        error: "Главный администратор не может быть отключён.",
      });
    const login = (
      await DB.editEntry({
        table,
        dataObj: {
          ...userData,
          updatedBy: req.auth.id,
          updatedAt: Date.now(),
        },
        respCol: "login",
      })
    )[0];

    return res.json(login);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Не удалось отключить аккаунт пользователя." });
  }
}

async function del(req, res) {
  try {
    if (+req.body.data.id === req.auth.id) {
      return res.status(400).json({
        error: "Нельзя удалить учётную запись авторизованного пользователя.",
      });
    }
    if (+req.body.data.id === 1)
      return res.status(400).json({
        error: "Главный администратор не может быть удалён",
      });

    const item = await DB.delEntry({
      table,
      id: req.body.data.id,
    });
    return res.json(item);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);

    res.status(400).json({ error: "Не удалось удалить пользователя" });
  }
}

module.exports = { add, edit, changePass, disable, getAll, del };

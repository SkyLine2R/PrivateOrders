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
  try {
    const userData = testingDataFromInput(usersDbSchema, req.body.data);

    if (userData.error) return res.json(userData.error);

    const candidate = await DB.findEntry({
      table: "users",
      searchColumn: "login",
      searchData: userData.login,
    });

    if (candidate.length) {
      return res.json({
        error: "Пользователь с таким логином уже существует",
      });
    }

    const hashPass = await bcrypt.hash(userData.pass, 10);

    const idUser = await DB.addEntry({
      table: "users",
      dataObj: { ...userData, pass: hashPass },
    });

    const resp = await DB.findEntry({
      table: "users",
      searchColumn: "id",
      searchData: idUser[0],
    });

    return res.json(resp[0].login);
  } catch (e) {
    res.status(400).json({ error: "Ошибка при добавлении пользователя" });
  }
}

module.exports = { addUser, getAllUsers };

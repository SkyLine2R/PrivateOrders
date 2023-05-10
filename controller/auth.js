const bcrypt = require("bcrypt");
const DB = require("./db");
const usersDbSchema = require("../components/users-db_schema");
const testingDataFromInput = require("../components/testing-data-from-input");

// class authController {}

async function addUser(req, res) {
  try {
    const userData = testingDataFromInput(req.body.data, usersDbSchema);
    if (userData.error) return res.json(userData.error);

    const candidate = await DB.findEntry({
      table: "users",
      searchColumn: "login",
      searchData: userData.login,
    });

    if (candidate) {
      return res.json({
        error: "Пользователь с таким логином уже существует",
      });
    }

    const hashPass = await bcrypt.hash(userData.pass, 10);

    const resp = await DB.addEntry1("users", { ...userData, pass: hashPass });

    return res.json(resp);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Ошибка при добавлении пользователя" });
  }
  return "asdfasdf";
}

module.exports = addUser;

const bcrypt = require("bcrypt");
const DB = require("./db");
const usersDbSchema = require("../components/users-db_schema");
const testingDataFromInput = require("../components/testing-data-from-input");

class authController {}

async function registration(req, res) {
  try {
    const userData = testingDataFromInput(req.body.data, usersDbSchema);
    if (userData.error) return res.json(userData.error);

    const candidate = await DB.findOne({
      table: "users",
      searchColumn: "login",
      searchData: userData.login,
    });

    if (candidate) {
      return res.json({
        message: "Пользователь с таким логином уже существует",
      });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = new Users({ username, email, password: hashPassword });
    await user.save();
    return res.json(true);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Registration error" });
  }
}

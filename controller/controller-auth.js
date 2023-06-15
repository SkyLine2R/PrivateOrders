const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const DB = require("./db");
const WORD_FOR_TOKEN = require("../components/wordForToken");

const generateAccessToken = (id, login) => {
  const payload = {
    id,
    login,
  };
  return jwt.sign(payload, WORD_FOR_TOKEN, { expiresIn: "1h" });
};

async function logIn(req, res) {
  try {
    console.log(req.body);
    const { login, pass } = req.body;

    const user = await DB.findEntry({
      table: "users",
      searchColumn: "login",
      searchData: login,
      respCol: ["id", "login", "name", "accessLevel"],
    });
    console.log(user);
    if (!user) {
      return res.json({
        error: "Неверная пара 'имя пользователя / пароль'",
      });
    }

    const validPassword = bcrypt.compareSync(pass, user.pass);

    if (!validPassword) {
      return res.json({ error: "Неверная пара 'имя пользователя / пароль'" });
    }
    const token = generateAccessToken(user.userId, user.login);
    return res.json({ login: user.login, name: user.name, token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Ошибка при попытке авторизации" });
  }
}

module.exports = { logIn };

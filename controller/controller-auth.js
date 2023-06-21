/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const DB = require("./db");
const WORD_FOR_TOKEN = require("../Environment-setting/WORD_FOR_TOKEN");

const generateAccessToken = (id, login) => {
  const payload = {
    id,
    login,
  };
  return jwt.sign(payload, WORD_FOR_TOKEN, { expiresIn: "5s" }); // 8h
};

async function logIn(req, res) {
  try {
    const { login, pass } = req.body;

    const [user] = await DB.findEntry({
      table: "users",
      searchColumn: "login",
      searchData: login,
      respCol: ["id", "login", "name", "pass", "accessLevel"],
    });

    if (!user?.id) {
      return res.json({
        error: "Неверная пара 'имя пользователя / пароль'",
      });
    }

    const validPassword = bcrypt.compareSync(pass, user.pass);

    if (!validPassword) {
      return res.json({ error: "Неверная пара 'имя пользователя / пароль'" });
    }
    if (user.accessLevel < 2)
      return res.json({
        error: "Ваша учётная запись отключена. Обратитесь к администратору.",
      });

    const token = generateAccessToken(user.id, user.login);
    const { id, ...authUser } = user;

    return res.json({ ...authUser, token });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(400).json({ error: "Ошибка при попытке авторизации" });
  }
}

module.exports = { logIn };

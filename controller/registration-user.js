const DB = require("./db");

async function editAccounts(req, res) {
  try {
    const user = { ...req.body.data };
    const { username, login, pass } = req.body;
    const candidate = await DB.findEntries("users", "login", login).length();
    if (candidate) {
      return res.json({
        message: "Пользователь с таким логином уже существует",
        code: 1,
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    // const user = new Users({ username, email, password: hashPassword });
    await user.save();
    return res.json(true);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Registration error" });
  }
}

module.exports = registration;

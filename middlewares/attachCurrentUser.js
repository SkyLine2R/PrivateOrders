const DB = require("../controllers/db");

const attachCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.auth;

    const { accessLevel } = (
      await DB.findEntry({
        table: "users",
        searchColumn: "id",
        searchData: id,
        respCol: ["accessLevel"],
      })
    )[0];

    if (!accessLevel) throw new Error();

    req.auth.accessLevel = accessLevel;
    return next();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.status(401).json({ error: "Ошибка авторизации" });
  }
};

module.exports = attachCurrentUser;

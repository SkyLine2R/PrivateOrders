const DB = require("../controller/db");

const attachCurrentUser = async (req, res, next) => {
  const [id] = req.user;
  console.log("req");
  console.log(req);

  const [userAccess] = await DB.findEntry({
    table: "users",
    searchColumn: "id",
    searchData: id,
    respCol: ["id", "accessLevel"],
  });

  if (!userAccess.accessLevel) {
    return res.status(401).end("Пользователь не найден");
  }

  req.currentUser = userAccess;
  return next();
};

module.exports = attachCurrentUser;

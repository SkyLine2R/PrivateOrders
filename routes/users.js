const usersController = require("../controllers/controller-users");
const accessDenied = require("../controllers/accessDenied");

module.exports = (req, res) => {
  const testAccess = accessDenied(req, res, 5);

  if (testAccess) return testAccess;

  switch (req.body.type) {
    case "get":
      return res.json("В процессе допила");
    case "getAll":
      return usersController.getAll(req, res);
    case "add":
      return usersController.add(req, res);
    case "edit":
      return usersController.edit(req, res);
    case "changePass":
      return usersController.changePass(req, res);
    case "disableUser":
      return usersController.disable(req, res);
    case "del":
      return usersController.del(req, res);
    default:
      return res.status(400).json({
        error: "Ошибка в запросе к БД",
      });
  }
};

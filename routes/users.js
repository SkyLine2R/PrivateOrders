const usersController = require("../controller/controller-users");
const accessDenied = require("../controller/accessDenied");

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
    default:
      return res.json({
        error: "Ошибка в запросе к БД",
      });
  }
};

const customerController = require("../controller/controller-customers");
const accessDenied = require("../controller/accessDenied");

module.exports = (req, res) => {
  console.log("asdfasdfasdfasdf");

  console.log("req");
  console.log(req);
  switch (req.body.type) {
    case "getAll":
      return accessDenied(req, res, 2) || customerController.getAll(req, res);
    case "add":
      return accessDenied(req, res, 4) || customerController.add(req, res);
    case "edit":
      return accessDenied(req, res, 4) || customerController.edit(req, res);
    default:
      return res.json({
        error: "Ошибка в запросе к БД",
      });
  }
};

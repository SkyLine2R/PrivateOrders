const customerController = require("../controller/controller-customers");
const accessDenied = require("../controller/accessDenied");

module.exports = (req, res) => {
  switch (req.body.type) {
    case "getAll":
      return accessDenied(req, res, 2) || colorsController.getAll(req, res);
    case "add":
      return accessDenied(req, res, 4) || colorsController.add(req, res);
    case "edit":
      return accessDenied(req, res, 4) || colorsController.edit(req, res);
    default:
      return res.json({
        error: "Ошибка в запросе к БД",
      });
  }
};

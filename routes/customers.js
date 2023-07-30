const customerController = require("../controllers/controller-customers");
const accessDenied = require("../controllers/accessDenied");

module.exports = (req, res) => {
  switch (req.body.type) {
    case "getAll":
      return accessDenied(req, res, 2) || customerController.getAll(req, res);
    case "add":
      return accessDenied(req, res, 4) || customerController.add(req, res);
    case "edit":
      return accessDenied(req, res, 4) || customerController.edit(req, res);
    case "del":
      return accessDenied(req, res, 4) || customerController.del(req, res);
    default:
      return res.status(400).json({
        error: "Ошибка в запросе к БД",
      });
  }
};

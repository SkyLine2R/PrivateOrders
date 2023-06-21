const controller = require("../controller/controller-colors");
const accessDenied = require("../controller/accessDenied");

module.exports = (req, res) => {
  switch (req.body.type) {
    case "getAll":
      return accessDenied(req, res, 2) || controller.getAll(req, res);
    case "add":
      return accessDenied(req, res, 4) || controller.add(req, res);
    case "edit":
      return accessDenied(req, res, 4) || controller.edit(req, res);
    default:
      return res.json({
        error: "Ошибка в запросе к БД",
      });
  }
};

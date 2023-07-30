const controller = require("../controllers/controller-colors");
const accessDenied = require("../controllers/accessDenied");

module.exports = (req, res) => {
  switch (req.body.type) {
    case "getAll":
      return accessDenied(req, res, 2) || controller.getAll(req, res);
    case "add":
      return accessDenied(req, res, 4) || controller.add(req, res);
    case "edit":
      return accessDenied(req, res, 4) || controller.edit(req, res);
    case "del":
      return accessDenied(req, res, 4) || controller.del(req, res);
    default:
      return res.status(400).json({
        error: "Ошибка в запросе к БД",
      });
  }
};

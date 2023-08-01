const stockController = require("../controllers/controller-stock");
const accessDenied = require("../controllers/accessDenied");

module.exports = (req, res) => {
  switch (req.body.type) {
    case "getAll":
      return accessDenied(req, res, 2) || stockController.getAll(req, res);
    case "getFiltered":
      return accessDenied(req, res, 2) || stockController.getFiltered(req, res);
    case "add":
      return accessDenied(req, res, 3) || stockController.add(req, res);
    case "edit":
      return accessDenied(req, res, 4) || stockController.edit(req, res);
    case "del":
      return accessDenied(req, res, 4) || stockController.del(req, res);
    default:
      return res.status(400).json({
        error: "Ошибка в запросе к БД",
      });
  }
};

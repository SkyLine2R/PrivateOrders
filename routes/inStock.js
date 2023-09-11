const inStockController = require("../controllers/controller-inStock");
const accessDenied = require("../controllers/accessDenied");

module.exports = (req, res, next) => {
  switch (req.body.type) {
    case "getAll":
      return accessDenied(req, res, 2) || inStockController.getAll(req, res);
    case "getFiltered":
      return (
        accessDenied(req, res, 2) || inStockController.getFiltered(req, res)
      );
    case "add":
      return accessDenied(req, res, 3) || inStockController.add(req, res, next);
    case "edit":
      return accessDenied(req, res, 4) || inStockController.edit(req, res);
    case "del":
      return accessDenied(req, res, 4) || inStockController.del(req, res);
    default:
      return res.status(400).json({
        error: "Ошибка в запросе к БД",
      });
  }
};

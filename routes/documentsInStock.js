const documentsController = require("../controllers/controller-documents");
const accessDenied = require("../controllers/accessDenied");

module.exports = (req, res) => {
  req.body.table = "inStockDocuments";
  console.log(req.body);
  switch (req.body.type) {
    case "getAll":
      return accessDenied(req, res, 2) || documentsController.getAll(req, res);
    case "add":
      return accessDenied(req, res, 4) || documentsController.add(req, res);
    case "edit":
      return accessDenied(req, res, 4) || documentsController.edit(req, res);
    case "del":
      return accessDenied(req, res, 4) || documentsController.edit(req, res);
    default:
      return res.json({
        error: "Ошибка в запросе к БД",
      });
  }
};

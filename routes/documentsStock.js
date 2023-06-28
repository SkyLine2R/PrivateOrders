const documentsController = require("../controllers/controller-documents");
const accessDenied = require("../controllers/accessDenied");

module.exports = (req, res) => {
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
      return res.status(400).json({
        error: "Не указан тип запроса.",
      });
  }
};

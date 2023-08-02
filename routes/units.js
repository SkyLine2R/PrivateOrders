const controller = require("../controllers/controller-units");
const accessDenied = require("../controllers/accessDenied");

module.exports = (req, res) => {
  switch (req.body.type) {
    case "getAll":
      return accessDenied(req, res, 2) || controller.getAll(req, res);
    default:
      return res.status(400).json({
        error: "Ошибка в запросе к БД",
      });
  }
};

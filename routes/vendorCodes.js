const vendorCodesController = require("../controllers/controller-vendor-codes");
const accessDenied = require("../controllers/accessDenied");

module.exports = (req, res) => {
  switch (req.body.type) {
    case "getAll":
      return (
        accessDenied(req, res, 2) || vendorCodesController.getAll(req, res)
      );
    case "getFiltered":
      return (
        accessDenied(req, res, 2) || vendorCodesController.getFiltered(req, res)
      );
    case "add":
      return accessDenied(req, res, 3) || vendorCodesController.add(req, res);
    case "edit":
      return accessDenied(req, res, 4) || vendorCodesController.edit(req, res);
    case "del":
      return accessDenied(req, res, 4) || vendorCodesController.del(req, res);
    default:
      return res.json({
        error: "Ошибка в запросе к БД",
      });
  }
};

var express = require("express");
var router = express.Router();

//получить все артикулы
router.get("/vendorcode/:number", function (req, res, next) {
  if (req.params.number == "all") {
    Item.all()
      .then((items) => {
        return res.json(items);
      })
      .catch((err) => {
        console.error(err);
        return res.json({
          error: false,
          message: "Ошибка при получении данных...",
        });
      });
  }
});

module.exports = router;

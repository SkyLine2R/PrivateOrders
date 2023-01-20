var express = require("express");
var router = express.Router();

//получить все артикулы
router.get("/vendorcode/:vendorCode", requestToDb);
router.get("/itemname/:itemname", requestToDb);
router.get("/filter/:tags", requestToDb);

//Отправка обратного ответа на запрос данных
function requestToDb(req, res, next) {
  const column = Object.keys(req.params)[0];
  console.log(column);
  console.log(req.params[column]);
  Item.findRecords(req.params[column], column)
    .then((items) => {
      return res.json(items);
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        error: true,
        message: "Ошибка при получении данных...",
      });
    });
}

module.exports = router;

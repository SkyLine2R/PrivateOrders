var express = require("express");
var router = express.Router();

//получить все артикулы
router.get("/vendorcode/:vendorCode", requestToDb); //будет приём запросов с артикулом
router.get("/itemname/:itemname", requestToDb);
router.get("/filter/:tags", requestToDb); //приём запросов с полей фильтра
router.post("/addItem", (req, res) => {
  console.log(req.body);
});
//Отправка ответа на запрос данных в поле фильтра
function requestToDb(req, res, next) {
  const column = Object.keys(req.params)[0];
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

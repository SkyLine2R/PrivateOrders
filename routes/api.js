var express = require("express");
var router = express.Router();

//получить все артикулы
router.get("/vendorcode/:vendorCode", requestToDb); //будет приём запросов с артикулом
router.get("/itemname/:itemname", requestToDb);
router.get("/filter/:tags", requestToDb); //приём запросов с полей фильтра
router.post("/addItem", (req, res) => {});
//Отправка ответа на запрос данных в поле фильтра
function requestToDb(req, res, next) {
  //console.log(req.body);

  const column = Object.keys(req.params)[0];
  Item.findRecords(req.params[column], column)
    .then((items) => {
      return res.json(items);
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        error: "Ошибка доступа к базе данных.",
      });
    });
}

{
  table: "str";
  column: "str";
  forFilter: true;
  reqString: "str";
}

/* function requestToDb(req, res, next) {
  const column = Object.keys(req.params)[0];
  Item.findRecords(req.params[column], column)
    .then((items) => {
      return res.json(items);
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        error: "Ошибка доступа к базе данных.",
      });
    });
} */

module.exports = router;

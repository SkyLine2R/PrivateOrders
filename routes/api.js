const express = require("express");

const router = express.Router();
const Items = require("../db");

/* router.post("/addEntry", (req, res) => {
  // Обработка записи объекта в БД
  console.log("Входящий запрос на добавление в БД: " + req.body.type);
  if (req.body.type === "getItems") {
    Items.filterRecords(req.body)
      .then((items) => res.json(items))
      .catch(() =>
        res.json({
          error: "Ошибка доступа к базе данных.",
        })
      );
  } else {
    console.error("Неправильный тип запроса");
    return res.json({
      error: "Неправильный тип запроса",
    });
  }
}); */

router.post("/", (req, res) => {
  console.log(req.body.data);

  switch (req.body.type) {
    case "getFilteredVendorCodes": // запрос поиска данных для автофильтра "Артикул"/"Наименование"
      Items.filterRecords(req.body.data)
        .then((items) => res.json(items))
        .catch((err) =>
          res.json({
            error: `Ошибка доступа к базе данных \n ${err}`,
          })
        );
      break;
    case "addNewVendorCode": // запрос на добавление артикула в БД
      Items.addEntry(req.body)
        .then((result) => {
          res.json(result);
        })
        .catch((err) =>
          res.json({
            error: `Ошибка при добавлении нового артикула в базу данных \n ${err}`,
          })
        );
      break;
    default:
      return res.json({
        error: "Ошибка в запросе к БД",
      });
  }
});

module.exports = router;

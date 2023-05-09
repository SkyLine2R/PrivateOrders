const express = require("express");

const router = express.Router();
const db = require("../controller/db");
const editAccounts = require("../controller/registration-user");
/* router.post("/addEntry", (req, res) => {
  // Обработка записи объекта в БД
  console.log("Входящий запрос на добавление в БД: " + req.body.type);
  if (req.body.type === "getDB") {
    DB.filterRecords(req.body)
      .then((DB) => res.json(DB))
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

// eslint-disable-next-line consistent-return
router.post("/", (req, res) => {
  switch (req.body.type) {
    case "getFilteredVendorCodes": // запрос поиска данных для автофильтра "Артикул"/"Наименование"
      db.filterRecords(req.body.data)
        .then((items) => res.json(items))
        .catch((err) =>
          res.json({
            error: `Ошибка доступа к базе данных \n ${err}`,
          })
        );
      break;
    case "addNewVendorCode": // запрос на добавление артикула в БД
      db.addEntry(req.body)
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

router.post("/admin", (req, res) => {
  req.body.type;
});

module.exports = router;

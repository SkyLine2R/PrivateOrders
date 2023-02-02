const express = require("express");
const router = express.Router();
const Items = require("../db");

router.post("/addEntry", (req, res) => {
  //Обработка записи объекта в БД
  console.log("Входящий запрос на добавление в БД: " + req.body.type);
  if (req.body.type === "getItems") {
    Items.filterRecords(req.body)
      .then((items) => res.json(items))
      .catch((err) => {
        console.error(err);
        return res.json({
          error: "Ошибка доступа к базе данных.",
        });
      });
  } else {
    console.error("Неправильный тип запроса");
    return res.json({
      error: "Неправильный тип запроса",
    });
  }
});

router.post("/", (req, res) => {
  console.log("Входящий запрос: " + req.body.type);

  //Обработка запроса поиска данных для автофильтра "Артикул", "Наименование"
  if (req.body.type === "getFilteredVendorCodes") {
    Items.filterRecords(req.body)
      .then((items) => res.json(items))
      .catch((err) => {
        console.error(err);
        return res.json({
          error: "Ошибка доступа к базе данных.",
        });
      });
  }

  //Поиск записей в БД по строке
  if (req.body.type === "findEntry") {
    Items.findEntry(req.body)
      .then((items) => res.json(items))
      .catch((err) => {
        console.error(err);
        return res.json({
          error: "Ошибка доступа к базе данных.",
        });
      });
  }
  /*
  //Обработка записи объекта в БД
  if (req.body.type === "addEntryToDB") {
    Items.filterRecords(req.body)
      .then((items) => res.json(items))
      .catch((err) => {
        console.error(err);
        return res.json({
          error: "Ошибка доступа к базе данных.",
        });
      });
  } else {
    console.error("Неправильный тип запроса");
    return res.json({
      error: "Неправильный тип запроса",
    });
  } */
});

module.exports = router;

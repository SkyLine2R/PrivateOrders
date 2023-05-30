const express = require("express");

const router = express.Router();
const DB = require("../controller/db");
const usersController = require("../controller/controller-users");
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

router.post("/users", (req, res) => {
  // добавить проверку прав доступа

  switch (req.body.type) {
    case "add":
      return usersController.addUser(req.body.data);
    case "get":
      return res.json("В процессе допила");
    case "getAll":
      console.log("getAll");
      return usersController.getAllUsers(req, res);
    case "edit":
      return res.json("В процессе допила");
    default:
      return res.json({
        error: "Ошибка в запросе к БД",
      });
  }
});

function DBreq(reqName, data, fieldsArr) {
  DB[reqName](data)
    .then((resData) => ({
      ...fieldsArr.map((field) => ({ field: resData[field] })),
    }))
    .catch((err) => ({
      error: `Ошибка доступа к базе данных \n ${err}`,
    }));
}

router.post("/vendor-codes", (req, res) => {
  switch (req.body.type) {
    case "getFiltered": // запрос поиска данных для автофильтра "Артикул"/"Наименование"
      DB.filterRecords(req.body.data)
        .then((items) => res.json(items))
        .catch((err) =>
          res.json({
            error: `Ошибка доступа к базе данных \n ${err}`,
          })
        );
      break;
    case "add": // запрос на добавление артикула в БД
      DB.addEntry({ ...req.body.data, createdBy: 1 }) // createdBy - сделать подстановку имени пользователя
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

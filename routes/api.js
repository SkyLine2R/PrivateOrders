const express = require("express");

const router = express.Router();
const DB = require("../controller/db");
const usersController = require("../controller/controller-users");
const itemsController = require("../controller/controller-items");

router.post("/users", (req, res) => {
  // добавить проверку прав доступа
  switch (req.body.type) {
    case "get":
      return res.json("В процессе допила");
    case "getAll":
      return usersController.getAllUsers(req, res);
    case "add":
      return usersController.addUser(req, res);
    case "editUser":
      return usersController.editUser(req, res);
    case "changePass":
      return usersController.changePass(req, res);
    case "disableUser":
      return usersController.disableUser(req, res);
    default:
      return res.json({
        error: "Ошибка в запросе к БД",
      });
  }
});

router.post("/vendorCodes", (req, res) => {
  switch (req.body.type) {
    case "getFiltered":
      return itemsController.getFiltered(req, res);
    case "add":
      return itemsController.add(req, res);

    /*     case "add": // запрос на добавление артикула в БД
      DB.addEntry({
        table: "items",
        dataObj: { ...req.body.data, createdBy: 1 },
        res,
      }) // createdBy - сделать подстановку имени пользователя
        .then((result) => {
          res.json(result);
        })
        .catch((err) =>
          res.json({
            error: `Ошибка при добавлении нового артикула в базу данных \n ${err}`,
          })
        );
      break; */
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

const express = require("express");

const router = express.Router();
const usersController = require("../controller/controller-users");
const itemsController = require("../controller/controller-vendor-codes");
const authController = require("../controller/controller-auth");

router.post("/login", (req, res) => {
  console.log("req.body");
  console.log(req.body);

  const resp = authController.logIn(req, res);
  /*   console.log(req.body);
   */ console.log(resp);
  /*   res.json({
    login: "oleg",
    name: "Олег Василенко",
    accessLevel: 5,
    token: "asdfasdfasdfn234234-Q#234",
  }); */
});

router.post("/users", (req, res) => {
  // добавить проверку прав доступа
  /*   console.log(req.body.type);
  if (!Object.prototype.hasOwnProperty.call(usersController, req.body.type))
    return res.json({
      error: "Ошибка в запросе к БД",
    });
  return res.json(usersController[req.body.type](req, res)); */

  switch (req.body.type) {
    case "get":
      return res.json("В процессе допила");
    case "getAll":
      return usersController.getAll(req, res);
    case "add":
      return usersController.add(req, res);
    case "edit":
      return usersController.edit(req, res);
    case "changePass":
      return usersController.changePass(req, res);
    case "disableUser":
      return usersController.disable(req, res);
    default:
      return res.json({
        error: "Ошибка в запросе к БД",
      });
  }
});

router.post("/vendorCodes", (req, res) => {
  switch (req.body.type) {
    case "getAll":
      return itemsController.getAll(req, res);
    case "getFiltered":
      return itemsController.getFiltered(req, res);
    case "add":
      return itemsController.add(req, res);
    case "edit":
      return itemsController.edit(req, res);
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

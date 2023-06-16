const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const router = express.Router();

const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const usersController = require("../controller/controller-users");
const itemsController = require("../controller/controller-vendor-codes");
const authController = require("../controller/controller-auth");

const WORD_FOR_TOKEN = require("../components/WORD_FOR_TOKEN");

const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
};
router.post("/login", (req, res) => {
  authController.logIn(req, res);
});

router.post(
  "/users",
  jwt({
    secret: WORD_FOR_TOKEN,
    algorithms: ["RS256"], // HS256 RS256
    /*     user: "token", // Здесь следующее промежуточное ПО сможет найти то, что было закодировано в services/auth:generateToken -> 'req.token' */
    getToken: getTokenFromHeader, // Функция для получения токена аутентификации из запроса
    credentialsRequired: false,
  }),
  /*  attachCurrentUser, */
  (req, res) => {
    console.log("req");
    console.log("req");

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
  }
);

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

/* router.post("/admin", (req, res) => {
  req.body.type;
}); */

module.exports = router;

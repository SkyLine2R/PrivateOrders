const express = require("express");

const router = express.Router();
const authController = require("../controller/controller-auth");

router.post("/", (req, res) => {
  authController.logIn(req, res);
});

module.exports = router;

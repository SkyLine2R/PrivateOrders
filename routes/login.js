const express = require("express");

const router = express.Router();
const authController = require("../controllers/controller-auth");

router.post("/", (req, res) => {
  authController.logIn(req, res);
});

module.exports = router;

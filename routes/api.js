const express = require("express");

const router = express.Router();

const users = require("./users");
const vendorcodes = require("./vendorCodes");
const customers = require("./customers");
const colors = require("./colors");
const documentsInStock = require("./documentsInStock");

router.post("/users", users);
router.post("/vendorCodes", vendorcodes);
router.post("/colors", colors);
router.post("/customers", customers);
router.post("/documentsInStock", documentsInStock);

module.exports = router;

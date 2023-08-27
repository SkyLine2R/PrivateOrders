const express = require("express");

const router = express.Router();
const attachCustomerAndTable = require("../middlewares/attachCustomerAndTable");

const users = require("./users");
const vendorcodes = require("./vendorCodes");
const customers = require("./customers");
const colors = require("./colors");
const documentsStock = require("./documentsStock");
const stock = require("./stock");
const units = require("./units");

router.post("/users", users);
router.post("/vendorCodes", vendorcodes);
router.post("/units", units);
router.post("/colors", colors);
router.post("/customers", customers);
router.post("/stock", stock);
router.post("/documentsInStock", attachCustomerAndTable, documentsStock);
router.post("/documentsOutStock", attachCustomerAndTable, documentsStock);
router.post("/inStock", stock, (req) => console.log(req.body));

module.exports = router;

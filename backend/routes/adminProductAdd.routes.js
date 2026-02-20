const express = require("express");
const router = express.Router();
const { addProduct } = require("../controller/adminProductAdd.controller");

router.post("/products", addProduct);

module.exports = router;

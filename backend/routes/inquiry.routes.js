const express = require("express");
const { submitInquiry } = require("../controller/inquiry.controller");

const router = express.Router();

router.post("/", submitInquiry);

module.exports = router;

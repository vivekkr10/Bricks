const express = require("express");
const router = express.Router();
const multer = require("multer");

const {addProduct, getProducts, deleteProduct, toggleStatus, getProductById} = require("../controller/ProductManage.controller")
const upload = multer({ dest: "uploads/" });

router.post("/add-product", upload.single("image"), addProduct);
router.get("/all-products", getProducts); 
router.get("/:id", getProductById);
router.delete("/delete-product/:id", deleteProduct);
router.patch("/toggle-status/:id", toggleStatus);

module.exports = router;

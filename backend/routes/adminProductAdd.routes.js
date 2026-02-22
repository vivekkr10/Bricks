const express = require("express");
const router = express.Router();
const multer = require("multer");

const {addProduct, getProducts, deleteProduct, toggleStatus, getProductById, editProduct, getCategories} = require("../controller/ProductManage.controller")
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post("/add-product", upload.array("images", 10), addProduct);
router.get("/all-products", getProducts); 
router.get("/all-categories", getCategories);


router.delete("/delete-product/:id", deleteProduct);
router.patch("/toggle-status/:id", toggleStatus);
router.put("/edit-product/:id", editProduct);
router.get("/:id", getProductById);
module.exports = router;

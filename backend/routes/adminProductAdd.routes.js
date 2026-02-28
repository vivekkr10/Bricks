const express = require("express");
const router = express.Router();
const multer = require("multer");

const {addProduct, getProducts, deleteProduct, toggleStatus, getProductById, editProduct} = require("../controller/ProductManage.controller")
const { addCategory, getAllCategories, deleteCategory } = require('../controller/Category.controller');
const { protect } = require('../middleware/auth');

const storage = multer.diskStorage({});
const upload = multer({ storage });

const cacheControl = (seconds) => (req, res, next) => {
  res.set('Cache-Control', `public, max-age=${seconds}`);
  next();
};

router.post("/add-product", upload.array("images", 10), protect, addProduct);
router.get("/all-products", cacheControl(60), getProducts); 
router.get('/all-categories', cacheControl(60), getAllCategories);
router.post('/categories',protect, addCategory);

router.delete('/categories/:id',protect, deleteCategory);

router.delete("/delete-product/:id",protect, deleteProduct);
router.patch("/toggle-status/:id",protect, toggleStatus);
router.put("/edit-product/:id",protect, editProduct);
router.get("/:id", getProductById);



module.exports = router;

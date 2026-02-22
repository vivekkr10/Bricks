const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      type,
      shortDesc,
      detailedDesc,
      specs,
      usage,
      status,
      image
    } = req.body;

    const productId = `BRK-${Date.now()}`;
    const newProduct = new Product({
      productId,
      productName: name,
      productType: type,
      shortDescription: shortDesc,
      detailedDescription: detailedDesc,
      specifications: specs,
      usageArea: usage,
      status: status || "Active",
      image: image
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added to MongoDB successfully!",
      product: savedProduct
    });

  } catch (error) {
    console.error("MongoDB Save Error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to add product to database" 
    });
  }
};


exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find().sort({ createdAt: -1 });
    
    res.status(200).json(products);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Could not fetch products from database" });
  }
};


// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found in database" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Product deleted successfully" 
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Internal Server Error during deletion" 
    });
  }
};


exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.status = product.status === "Active" ? "Inactive" : "Active";
    await product.save();

    res.status(200).json({ 
      success: true, 
      newStatus: product.status 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

 exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error: error.message });
  }
};
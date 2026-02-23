const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
  const {
      name, productName,      
      type, productType,      
      shortDesc, shortDescription,
      detailedDesc, detailedDescription,
      usage, usageArea,
      status,
      images, image,
      specifications,
      strength, size, weight, waterAbsorption 
    } = req.body;
    const productId = `BRK-${Date.now()}`;

    const newProduct = new Product({
      productId,
     productName: productName || name,
    productType: productType || type,
      shortDescription: shortDescription || shortDesc,
      detailedDescription: detailedDescription || detailedDesc,
      usageArea: usageArea || usage,
      status: status || "Active",
      images: images || (image ? [image] : []),
      specifications: {
        strength: specifications?.strength || strength,
        size: specifications?.size || size,
        weight: specifications?.weight || weight,
        waterAbsorption: specifications?.waterAbsorption || waterAbsorption
      }
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added to MongoDB successfully!",
      product: savedProduct
    });

  } catch (error) {
    console.error("MongoDB Save Error:", error);
    res.status(400).json({ 
      success: false, 
      error: "Validation failed or database error",
      details: error.message 
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

// EDIT/UPDATE PRODUCT
exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    const {
      name, productName,
      type, productType,
      shortDesc, shortDescription,
      detailedDesc, detailedDescription,
      usage, usageArea,
      status,
      images, image,
      specifications,
      strength, size, weight, waterAbsorption 
    } = req.body;

    const updateData = {
      productName: productName || name,
      productType: productType || type,
      shortDescription: shortDescription || shortDesc,
      detailedDescription: detailedDescription || detailedDesc,
      usageArea: usageArea || usage,
      status: status,
      
      images: images || (image ? (Array.isArray(image) ? image : [image]) : undefined),
      
      specifications: {
        strength: specifications?.strength || strength,
        size: specifications?.size || size,
        weight: specifications?.weight || weight,
        waterAbsorption: specifications?.waterAbsorption || waterAbsorption
      }
    };

    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      product: updatedProduct
    });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(400).json({ 
      success: false, 
      error: "Failed to update product",
      details: error.message 
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
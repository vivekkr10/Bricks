const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  
  productId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  
  productName: { 
    type: String, 
    required: [true, "Product Name is required"],
    trim: true 
  },
  
  productType: { 
    type: String, 
    required: [true, "Product Type is required"] 
  },
  
  shortDescription: { 
    type: String 
  },
  
  detailedDescription: { 
    type: String 
  },
  
 specifications: {
    strength: { type: String },
    size: { type: String },
    weight: { type: String },
    waterAbsorption: { type: String }
  },
  
  usageArea: { 
    type: String 
  },
  
  status: { 
    type: String, 
    default: "Active",
    enum: ["Active", "Inactive"] 
  },

 images: [{ type: String }]
 
}, { timestamps: true }); 

module.exports = mongoose.model('Product', ProductSchema);
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Category title is required'],
    unique: true, 
    trim: true
  },
  image: {
    type: String, 
    required: [true, 'Category image is required']
  }
}, { timestamps: true });

CategorySchema.index({ title: 1 });

module.exports = mongoose.model('Category', CategorySchema);
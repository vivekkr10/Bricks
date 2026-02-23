const Category = require('../models/Category');
const cloudinary = require('../config/cloudinary');

exports.addCategory = async (req, res) => {
    try {
        const { title, image } = req.body;

        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: 'vr_and_sons/categories',
        });


        const category = await Category.create({
            title,
            image: uploadResponse.secure_url
        });

        res.status(201).json({
            success: true,
            category: {
                _id: category._id,
                title: category.title,
                image: category.image 
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ title: 1 });
        res.status(200).json({
            success: true,
            count: categories.length,
            categories
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Not found" });

        const publicId = category.image.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId);

        await category.deleteOne();

        res.status(200).json({ success: true, message: "Category and Image removed" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
const bcrypt = require("bcryptjs");
const db = require("../models");
const path = require("path");
const fs = require("fs");

const Category = db.Category;


exports.addCategory = async (req, res) => {

  try {
    if (!req.file)
      return res.status(400).json({ message: "Image required" });

    const category_image = `uploads/categories/${req.file.filename}`;

    const maxOrder = await Category.max("cat_priority");

    const nextOrder = (maxOrder || 0) + 1;

    const category = await Category.create({
      name: req.body.name,
      subtitle: req.body.subtitle,
      image: category_image,
      cat_priority: nextOrder
    });

    res.json({
      success: true,
      message: "Category added successfully",
      data: category,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["cat_priority", "ASC"]],
    });

    res.json({
      success: true,
      data: categories,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateCategory = async (req, res) => {
  try {

    const category = await Category.findByPk(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    let category_image = category.image;

    
    if (req.file) {

        if (category.image) {

            const oldImagePath = path.join(
            __dirname,
            "../uploads/categories",
            category.image
            );

            // check if file exists
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
                console.log("Old image deleted ✅");
            } else {
                console.log("Old image not found ❌");
            }
        }

        //imageName = req.file.filename;

      category_image = `uploads/categories/${req.file.filename}`;
    }

    await category.update({
      name: req.body.name,
      subtitle: req.body.subtitle,
      image: category_image,
    });

    res.json({
      success: true,
      message: "Category updated successfully",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 🗑 Delete old image
    if (category.image) {
      const imagePath = path.join(
        __dirname,
        "../uploads/categories",
        category.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // 🗑 Delete DB record
    await category.destroy();

    res.json({ message: "Category deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};


exports.reorderCategories = async (req, res) => {
  try {
    const { items } = req.body; 
    // items = [{id:1, cat_priority:1}, {id:3, cat_priority:2}...]

    const updatePromises = items.map(item =>
      Category.update(
        { cat_priority: item.cat_priority },
        { where: { id: item.id } }
      )
    );

    await Promise.all(updatePromises);

    res.json({ message: "Category order updated successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

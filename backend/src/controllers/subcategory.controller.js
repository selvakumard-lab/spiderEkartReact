const bcrypt = require("bcryptjs");
const db = require("../models");
const path = require("path");
const fs = require("fs");

const Category = db.Category;
const SubCategory = db.SubCategory;


exports.addSubCategory = async (req, res) => {
  try {

    const { category_id, name, subtitle } = req.body;

    
    if (!category_id || !name)
      return res.status(400).json({ message: "Category & Name required" });

    if (!req.file)
      return res.status(400).json({ message: "Image required" });

    const categoryExists = await Category.findByPk(category_id);
    if (!categoryExists)
      return res.status(404).json({ message: "Parent category not found" });

    const subcategory_image = `uploads/subcategories/${req.file.filename}`;

    const subcategory = await SubCategory.create({
      category_id,
      name,
      subtitle,
      image: subcategory_image,
    });

    res.status(201).json({
      success: true,
      message: "Sub Category added successfully",
      data: subcategory,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSubCategories = async (req, res) => {
  try {

    const subcategories = await SubCategory.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
      order: [["id", "DESC"]],
    });

    res.json({
      success: true,
      data: subcategories,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.getSubCategories = async (req, res) => {
//   try {
//     const subcategories = await SubCategory.findAll({
//       order: [["id", "DESC"]],
//     });

//     res.json({
//       success: true,
//       data: subcategories,
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


exports.updateSubCategory = async (req, res) => {
  try {

    const subcategory = await SubCategory.findByPk(req.params.id);

    if (!subcategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    let subcategory_image = subcategory.image;

    if (req.file) {

      if (subcategory.image) {

        const oldImagePath = path.join(__dirname, "..", subcategory.image);

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log("Old image deleted ✅");
        } else {
          console.log("Old image not found ❌");
        }
      }

      subcategory_image = `uploads/subcategories/${req.file.filename}`;
    }

    await subcategory.update({
      category_id: req.body.category_id,
      name: req.body.name,
      subtitle: req.body.subtitle,
      image: subcategory_image,
    });

    res.json({
      success: true,
      message: "SubCategory updated successfully",
      data: subcategory
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Find subcategory
    const subcategory = await SubCategory.findByPk(id);

    if (!subcategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    // 2️⃣ Delete image
    if (subcategory.image) {
      // DB value: uploads/subcategories/xxxx.png
      const imagePath = path.join(__dirname, "..", subcategory.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Image deleted ✅");
      } else {
        console.log("Image not found ❌");
      }
    }

    // 3️⃣ Delete DB record
    await subcategory.destroy();

    res.json({
      success: true,
      message: "SubCategory deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};
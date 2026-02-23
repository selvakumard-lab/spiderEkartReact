const bcrypt = require("bcryptjs");
const db = require("../models");
const path = require("path");
const fs = require("fs");

const Brand = db.Brand;


exports.addBrand = async (req, res) => {

  try {
    if (!req.file)
      return res.status(400).json({ message: "Image required" });

    const brand_image = `uploads/brand/${req.file.filename}`;

    const brand = await Brand.create({
      name: req.body.name,
      image: brand_image
    });

    res.json({
      success: true,
      message: "brand added successfully",
      data: brand,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBrand = async (req, res) => {
  try {
    const brand = await Brand.findAll({
      order: [["id", "ASC"]],
    });

    res.json({
      success: true,
      data: brand,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateBrand = async (req, res) => {
  try {

    const brand = await Brand.findByPk(req.params.id);
    if (!brand)
      return res.status(404).json({ message: "brand not found" });

    let brand_image = brand.image;

    
    if (req.file) {

        if (brand.image) {

            const oldImagePath = path.join(
            __dirname,
            "../uploads/brand",
            brand.image
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

      brand_image = `uploads/brand/${req.file.filename}`;
    }

    await brand.update({
      name: req.body.name,
      image: brand_image,
    });

    res.json({
      success: true,
      message: "brand updated successfully",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).json({ message: "brand not found" });
    }

    // 🗑 Delete old image
    if (brand.image) {
      const imagePath = path.join(
        __dirname,
        "../uploads/brand",
        brand.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // 🗑 Delete DB record
    await brand.destroy();

    res.json({ message: "brand deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};
const db = require("../models");

const Product = db.Product;
const Variation = db.ProductVariation;

exports.createProduct = async (req, res) => {
  try {

    /* BODY DATA */
    const {
      product_name,
      price_type,
      hsn,
      sgst,
      cgst,
      igst,
      type,
      description,
      category,
      sub_category,
      brand,
      minimum_stock,
      status,
    } = req.body;

    /* IMAGES */
    let main_image = null;
    let other_images = [];

    if (req.files.main_image) {
      main_image = req.files.main_image[0].filename;
      main_image = `uploads/products/${req.files.main_image[0].filename}`;
    }

   if (req.files.other_images) {
        other_images = req.files.other_images.map(
            (img) => `uploads/products/${img.filename}`
        );
        }

    /* CREATE PRODUCT */

    const product = await Product.create({
      product_name,
      price_type,
      hsn,
      sgst,
      cgst,
      igst,
      type,
      description,
      category,
      sub_category,
      brand,
      minimum_stock,
      status,
      main_image,
      other_images: JSON.stringify(other_images),
    });

    /* VARIATIONS */

    const variations = JSON.parse(req.body.variations);

    for (let v of variations) {
      await Variation.create({
        product_id: product.id,
        measurement: v.measurement,
        unit: v.unit,
        weight: v.weight,
        mrp: v.mrp,
        selling_price: v.selling_price,
        product_price: v.product_price,
        stock: v.stock,
        status: v.status,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {

    const products = await Product.findAll({
      include: [
        {
          model: Variation,
          as: "variations"
        }
      ],
      order: [["id", "DESC"]],
    });

    let productList = [];

    products.forEach(product => {

      product.variations.forEach(variation => {

        productList.push({
          id: product.id,
          product_name: product.product_name,
          image: product.main_image,

          variation_id: variation.id,
          measurement: variation.measurement,
          unit: variation.unit,
          price: variation.selling_price,
          stock: variation.stock
        });

      });

    });

    res.json({
      success: true,
      data: productList
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};
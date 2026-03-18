const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

const upload = require("../middlewares/upload");


router.post(
  "/create",

  upload("products").fields([
    { name: "main_image", maxCount: 1 },
    { name: "other_images", maxCount: 10 },
  ]),

  productController.createProduct
);


router.get("/", productController.getProducts);



// router.get("/:id", productController.getProduct);


// router.put(
//   "/update/:id",

//   upload("products").fields([
//     { name: "main_image", maxCount: 1 },
//     { name: "other_images", maxCount: 10 },
//   ]),

//   productController.updateProduct
// );


// router.delete("/delete/:id", productController.deleteProduct);


module.exports = router;
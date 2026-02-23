const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const brandController = require("../controllers/brand.controller");


router.post("/",upload("brand").single("image"),brandController.addBrand);

router.get("/", brandController.getBrand);

router.put("/:id", upload("brand").single("image"), brandController.updateBrand);

router.delete("/:id", brandController.deleteBrand);


module.exports = router;

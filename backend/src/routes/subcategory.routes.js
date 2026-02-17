const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const subCategoryController = require("../controllers/subcategory.controller");


router.post("/",upload("subcategories").single("image"),subCategoryController.addSubCategory);

router.get("/", subCategoryController.getSubCategories);

router.put("/:id", upload("subcategories").single("image"), subCategoryController.updateSubCategory);

router.delete("/:id", subCategoryController.deleteSubCategory);


module.exports = router;

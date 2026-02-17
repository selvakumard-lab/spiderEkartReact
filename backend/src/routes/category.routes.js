const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const categoryController = require("../controllers/category.controller");


// router.post("/", upload.single("image"), categoryController.addCategory);
router.post("/",upload("categories").single("image"),categoryController.addCategory);

router.get("/", categoryController.getCategories);

router.put("/:id", upload("categories").single("image"), categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);


router.post("/reorder", categoryController.reorderCategories);


module.exports = router;

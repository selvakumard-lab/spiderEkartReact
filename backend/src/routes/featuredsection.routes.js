const express = require("express");
const router = express.Router();
const featuredSectionController = require("../controllers/featuredSection.controller");


router.post("/",featuredSectionController.create);
router.get("/", featuredSectionController.getAll);

router.put("/:id", featuredSectionController.update);

router.delete("/:id", featuredSectionController.remove);


module.exports = router;

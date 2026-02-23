const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const homeBannerController = require("../controllers/homeBanner.controller");

router.post("/",upload("homebanner").single("image"),homeBannerController.addHomeBanner);

router.get("/", homeBannerController.getHomeBanner);

router.put("/:id", upload("homebanner").single("image"), homeBannerController.updateHomeBanner);

router.delete("/:id", homeBannerController.deleteHomeBanner);



module.exports = router;


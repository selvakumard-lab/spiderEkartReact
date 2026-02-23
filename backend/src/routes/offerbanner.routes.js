const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const offerBannerController = require("../controllers/offerBanner.controller");

router.post("/",upload("offerbanner").single("image"),offerBannerController.addofferBanner);

router.get("/", offerBannerController.getofferBanner);

router.put("/:id", upload("offerbanner").single("image"), offerBannerController.updateofferBanner);

router.delete("/:id", offerBannerController.deleteofferBanner);



module.exports = router;


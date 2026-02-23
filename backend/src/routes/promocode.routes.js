const express = require("express");
const router = express.Router();
const promoCodeController = require("../controllers/promoCode.controller");


router.post("/",promoCodeController.createPromoCode);
router.get("/", promoCodeController.getPromoCode);

router.put("/:id", promoCodeController.updatePromoCode);

router.delete("/:id", promoCodeController.removePromoCode);


module.exports = router;

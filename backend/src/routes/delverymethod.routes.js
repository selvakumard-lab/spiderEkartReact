const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const deliveryMethodController = require("../controllers/deliveryMethod.controller");


router.post("/",deliveryMethodController.saveAllMethods);
router.get("/", deliveryMethodController.getMethods);
// router.get("/", brandController.getBrand);


module.exports = router;

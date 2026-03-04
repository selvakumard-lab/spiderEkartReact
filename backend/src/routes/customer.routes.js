const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");


router.get("/list", customerController.getCustomers);
router.post("/update-wallet",customerController.updateWallet);


module.exports = router;
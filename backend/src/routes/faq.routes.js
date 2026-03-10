const express = require("express");
const router = express.Router();

const faqController = require("../controllers/faq.controller.js");

router.post("/store", faqController.storeFaq);
router.get("/list", faqController.getFaq);

module.exports = router;
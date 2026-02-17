const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
// router.post("/login", authController.login);

router.get("/by-slug/:slug", authController.getTenantBySlug);


module.exports = router;

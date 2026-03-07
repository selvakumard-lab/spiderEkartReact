const express = require("express");
const router = express.Router();
const districtController = require("../controllers/district.controller");


router.post("/",districtController.createDistrict);

router.get("/", districtController.getDistricts);

router.put("/:id", districtController.updateDistrict);

router.delete("/:id", districtController.deleteDistrict);

router.get("/by-state/:state_id", districtController.getDistrictByState);


module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const settingController = require("../controllers/setting.controller");



// router.put("/",upload.fields([{ name: "logoimage", maxCount: 1 },{ name: "stampimage", maxCount: 1 },]), settingController.updateSettings);


router.put(
  "/",
  upload("settings").fields([
    { name: "logoimage", maxCount: 1 },
    { name: "stampimage", maxCount: 1 },
  ]),
  settingController.updateSettings
);
router.get("/", settingController.getSettings);




router.get("/payment", settingController.getPaymentSettings);
router.put("/payment", settingController.updatePaymentSettings);


router.get("/timeslot/", settingController.getTimeSlots);
router.post("/timeslot/", settingController.createTimeSlot);
router.put("/timeslot/:id", settingController.updateTimeSlot);
router.delete("/timeslot/:id", settingController.deleteTimeSlot);


router.get("/notification", settingController.getNotificationSettings);
router.put("/notification", settingController.updateNotificationSettings);

router.get("/cms", settingController.getCmsSettings);
router.put("/cms", settingController.updateCmsSettings);



module.exports = router;
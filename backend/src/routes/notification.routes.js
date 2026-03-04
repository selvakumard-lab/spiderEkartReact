const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const notificationController = require("../controllers/notification.controller");


router.post("/send",upload("notifications").single("image"),notificationController.addNotification);

router.get("/", notificationController.getNotifications);

// router.delete("/:id", notificationController.deleteCategory);



module.exports = router;

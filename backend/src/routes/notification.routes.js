const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const notificationController = require("../controllers/notification.controller");


router.get("/", notificationController.getNotifications);

router.post("/send",upload("notifications").single("image"),notificationController.addNotification);


router.delete("/:id", notificationController.deleteNotification);



module.exports = router;

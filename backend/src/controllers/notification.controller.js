const db = require("../models");
const path = require("path");
const fs = require("fs");

const Notification = db.Notification;



// exports.getNotifications = async (req, res) => {
  
//     const data = await Notification.findAll({
//       order: [["id", "DESC"]]
//     });

//     res.status(200).json({
//       success: true,
//       data
//     });

// };

exports.getNotifications = async (req, res) => {
  try {

    const data = await Notification.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {

    console.error("❌ Notification Query Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.addNotification = async (req, res) => {


  try {

    const { type, ref_id, title, message, include_image } = req.body;

    let imagePath = null;

    if (include_image === "true" && req.file) {
      imagePath = `uploads/notifications/${req.file.filename}`;
    }

    const notification = await Notification.create({
      type,
      ref_id: ref_id || null,
      title,
      message,
      include_image,
      image: imagePath
    });

    return res.status(200).json({
      success: true,
      message: "Notification sent successfully",
      data: notification
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }



};






exports.deleteNotification = async (req, res) => {
  try {

    const { id } = req.params;

    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await notification.destroy();

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });

  } catch (error) {

    console.error("❌ Delete Notification Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
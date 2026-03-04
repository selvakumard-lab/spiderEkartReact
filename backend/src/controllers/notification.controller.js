const db = require("../models");
const path = require("path");
const fs = require("fs");

const Notification = db.Notification;


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

exports.getNotifications = async (req, res) => {
  try {

    const data = await Notification.findAll({
      order: [["id", "DESC"]]
    });

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




// exports.deleteCategory = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const category = await Category.findByPk(id);

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     // 🗑 Delete old image
//     if (category.image) {
//       const imagePath = path.join(
//         __dirname,
//         "../uploads/categories",
//         category.image
//       );

//       if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath);
//       }
//     }

//     // 🗑 Delete DB record
//     await category.destroy();

//     res.json({ message: "Category deleted successfully" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Delete failed" });
//   }
// };
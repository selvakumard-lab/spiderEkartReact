const db = require("../models");
const path = require("path");
const fs = require("fs");

const Setting = db.Setting;
const PaymentSetting = db.PaymentSetting;
const TimeSlot = db.TimeSlot;
const NotificationSetting = db.NotificationSetting;



// exports.addCategory = async (req, res) => {

//   try {
//     if (!req.file)
//       return res.status(400).json({ message: "Image required" });

//     const category_image = `uploads/categories/${req.file.filename}`;

//     const maxOrder = await Category.max("cat_priority");

//     const nextOrder = (maxOrder || 0) + 1;

//     const category = await Category.create({
//       name: req.body.name,
//       subtitle: req.body.subtitle,
//       image: category_image,
//       cat_priority: nextOrder
//     });

//     res.json({
//       success: true,
//       message: "Category added successfully",
//       data: category,
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.updateSettings = async (req, res) => {
  try {

    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({});
    }

    if (req.files) {
      if (req.files.logoimage) {
        req.body.logoimage = req.files.logoimage[0].filename;
      }

      if (req.files.stampimage) {
        req.body.stampimage = req.files.stampimage[0].filename;
      }
    }

    await settings.update(req.body);

    res.json({ message: "Settings Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({});
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePaymentSettings = async (req, res) => {
  try {
    const settings = await PaymentSetting.findByPk(1);

    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }

    await settings.update(req.body);

    res.json({
      success: true,
      message: "Payment Settings Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



exports.getPaymentSettings = async (req, res) => {
  try {
    const settings = await PaymentSetting.findByPk(1);

    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }

    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



exports.getTimeSlots = async (req, res) => {
  try {
    const data = await TimeSlot.findAll({
      order: [["id", "DESC"]],
    });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createTimeSlot = async (req, res) => {
  try {
    const { title, fromTime, toTime, lastOrderTime, status } = req.body;

    if (!title || !fromTime || !toTime || !lastOrderTime) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newSlot = await TimeSlot.create({
      title,
      fromTime,
      toTime,
      lastOrderTime,
      status,
    });

    res.json({
      success: true,
      message: "Time Slot Created Successfully",
      data: newSlot,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.updateTimeSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await TimeSlot.findByPk(id);

    if (!slot) {
      return res.status(404).json({ message: "Time Slot Not Found" });
    }

    await slot.update(req.body);

    res.json({
      success: true,
      message: "Time Slot Updated Successfully",
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.deleteTimeSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await TimeSlot.findByPk(id);

    if (!slot) {
      return res.status(404).json({ message: "Time Slot Not Found" });
    }

    await slot.destroy();

    res.json({
      success: true,
      message: "Time Slot Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getNotificationSettings = async (req, res) => {
  try {
    let settings = await NotificationSetting.findOne();

    // If no row exists, create empty row
    if (!settings) {
      settings = await NotificationSetting.create({
        fcmServerKey: "",
      });
    }

    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.updateNotificationSettings = async (req, res) => {
  try {
    const { fcmServerKey } = req.body;

    if (!fcmServerKey) {
      return res.status(400).json({
        message: "FCM Server Key is required",
      });
    }

    let settings = await NotificationSetting.findOne();

    // If no row exists → create
    if (!settings) {
      settings = await NotificationSetting.create({
        fcmServerKey,
      });
    } else {
      await settings.update({ fcmServerKey });
    }

    res.json({
      success: true,
      message: "Notification Settings Updated Successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
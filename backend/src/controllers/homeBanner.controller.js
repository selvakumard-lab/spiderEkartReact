const db = require("../models");
const path = require("path");
const fs = require("fs");

const HomeBanner = db.HomeBanner;


exports.addHomeBanner = async (req, res) => {

  try {
    if (!req.file)
      return res.status(400).json({ message: "Image required" });

    const banner_image = `uploads/homebanner/${req.file.filename}`;

    const banner = await HomeBanner.create({
      slider_type: req.body.slider_type,
      type: req.body.type,
      ref_id: req.body.ref_id && req.body.ref_id !== "" ? req.body.ref_id : null,
      image: banner_image,
    });

    res.json({
      success: true,
      message: "Banner added",
      data: banner,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getHomeBanner = async (req, res) => {
  const data = await HomeBanner.findAll({ order: [["id", "DESC"]] });
  res.json({ success: true, data });
};


exports.updateHomeBanner = async (req, res) => {
  try {
    const banner = await HomeBanner.findByPk(req.params.id);

    if (!banner) return res.status(404).json({ message: "Not found" });

    let imagePath = banner.image;

    if (req.file) {
      if (banner.image && fs.existsSync(banner.image)) {
        fs.unlinkSync(banner.image);
      }
      imagePath = "uploads/homebanner/" + req.file.filename;
    }

    await banner.update({
      slider_type: req.body.slider_type,
      type: req.body.type,
      ref_id: req.body.ref_id || null,
      image: imagePath,
    });

    res.json({ success: true, message: "Banner updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteHomeBanner = async (req, res) => {
  const banner = await HomeBanner.findByPk(req.params.id);
  if (!banner) return res.status(404).json({ message: "Not found" });

  if (banner.image && fs.existsSync(banner.image)) {
    fs.unlinkSync(banner.image);
  }

  await banner.destroy();
  res.json({ success: true, message: "Banner deleted" });
};
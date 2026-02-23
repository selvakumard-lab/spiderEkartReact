const db = require("../models");
const path = require("path");
const fs = require("fs");

const OfferBanner = db.OfferBanner;


exports.addofferBanner = async (req, res) => {

  try {
    if (!req.file)
      return res.status(400).json({ message: "Image required" });

    const banner_image = `uploads/offerbanner/${req.file.filename}`;

    const banner = await OfferBanner.create({
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

exports.getofferBanner = async (req, res) => {
  const data = await OfferBanner.findAll({ order: [["id", "DESC"]] });
  res.json({ success: true, data });
};


exports.updateofferBanner = async (req, res) => {
  try {
    const banner = await OfferBanner.findByPk(req.params.id);

    if (!banner) return res.status(404).json({ message: "Not found" });

    let imagePath = banner.image;

    if (req.file) {
      if (banner.image && fs.existsSync(banner.image)) {
        fs.unlinkSync(banner.image);
      }
      imagePath = "uploads/offerbanner/" + req.file.filename;
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


exports.deleteofferBanner = async (req, res) => {
  const banner = await OfferBanner.findByPk(req.params.id);
  if (!banner) return res.status(404).json({ message: "Not found" });

  if (banner.image && fs.existsSync(banner.image)) {
    fs.unlinkSync(banner.image);
  }

  await banner.destroy();
  res.json({ success: true, message: "Banner deleted" });
};
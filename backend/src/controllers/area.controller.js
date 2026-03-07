const db = require("../models");

const Area = db.Area;
const City = db.City;

exports.createArea = async (req, res) => {

  try {

    const { city_id, area_name, pincode } = req.body;

    const area = await Area.create({
      city_id,
      area_name,
      pincode,
    });

    res.json({
      success: true,
      message: "Area created successfully",
      data: area,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error creating area",
    });

  }

};


exports.getAreas = async (req, res) => {

  try {

    const areas = await Area.findAll({
      include: [
        {
          model: City,
        },
      ],
      order: [["id", "DESC"]],
    });

    res.json({
      success: true,
      data: areas,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching areas",
    });

  }

};


exports.updateArea = async (req, res) => {

  try {

    const id = req.params.id;

    const { city_id, area_name, pincode } = req.body;

    await Area.update(
      {
        city_id,
        area_name,
        pincode,
      },
      {
        where: { id },
      }
    );

    res.json({
      success: true,
      message: "Area updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error updating area",
    });

  }

};


exports.deleteArea = async (req, res) => {

  try {

    const id = req.params.id;

    await Area.destroy({
      where: { id },
    });

    res.json({
      success: true,
      message: "Area deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error deleting area",
    });

  }

};
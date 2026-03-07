
const db = require("../models");

const State = db.State;
const District = db.District;
const City = db.City;

// GET Cities
exports.getCities = async (req, res) => {

  try {

    const cities = await City.findAll({
      include: [
        {
          model: District,
          include: [State]
        }
      ],
      order: [["id", "DESC"]]
    });

    res.json({
      success: true,
      data: cities
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching cities"
    });

  }

};



// CREATE City
exports.createCity = async (req, res) => {

  try {

    const { district_id, name } = req.body;

    const city = await City.create({
      district_id,
      name
    });

    res.json({
      success: true,
      message: "City created successfully",
      data: city
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error creating city"
    });

  }

};



// UPDATE City
exports.updateCity = async (req, res) => {

  try {

    const { id } = req.params;

    const { district_id, name } = req.body;

    await City.update(
      { district_id, name },
      { where: { id } }
    );

    res.json({
      success: true,
      message: "City updated successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error updating city"
    });

  }

};



// DELETE City
exports.deleteCity = async (req, res) => {

  try {

    const { id } = req.params;

    await City.destroy({
      where: { id }
    });

    res.json({
      success: true,
      message: "City deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error deleting city"
    });

  }

};
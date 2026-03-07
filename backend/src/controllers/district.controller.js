const db = require("../models");

const State = db.State;
const District = db.District;

exports.getState = async (req, res) => {

  try {

    const states = await State.findAll({
      order: [["id", "DESC"]]
    });

    res.json({
      success: true,
      data: states
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



exports.addDistrict = async (req, res) => {

  try {

    const state = await State.create({
      name: req.body.name
    });

    res.json({
      success: true,
      message: "State added successfully",
      data: state
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



exports.updateState = async (req, res) => {

  try {

    const id = req.params.id;

    await State.update(
      { name: req.body.name },
      { where: { id: id } }
    );

    res.json({
      success: true,
      message: "State updated successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



exports.deleteState = async (req, res) => {

  try {

    const id = req.params.id;

    await State.destroy({
      where: { id: id }
    });

    res.json({
      success: true,
      message: "State deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


exports.getDistricts = async (req, res) => {

  try {

    const districts = await District.findAll({

      include: [
        {
          model: State,
          attributes: ["id", "name"]
        }
      ],

      order: [["id", "DESC"]]

    });

    res.json({
      success: true,
      data: districts
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


exports.createDistrict = async (req, res) => {

  try {

    const district = await District.create({

      state_id: req.body.state_id,
      name: req.body.name

    });

    res.json({
      success: true,
      message: "District created successfully",
      data: district
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


exports.updateDistrict = async (req, res) => {

  try {

    await District.update(req.body, {

      where: { id: req.params.id }

    });

    res.json({
      success: true,
      message: "District updated successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


exports.deleteDistrict = async (req, res) => {

  try {

    await District.destroy({

      where: { id: req.params.id }

    });

    res.json({
      success: true,
      message: "District deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.getDistrictByState = async (req, res) => {

  try {

    const { state_id } = req.params;

    const districts = await District.findAll({
      where: { state_id: state_id },
      order: [["name", "ASC"]],
    });

    return res.json({
      success: true,
      data: districts,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch districts",
    });

  }

};
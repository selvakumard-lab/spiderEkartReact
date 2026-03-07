const db = require("../models");

const State = db.State;

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



exports.addState = async (req, res) => {

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
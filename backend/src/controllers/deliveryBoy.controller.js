
const bcrypt = require('bcrypt');
const db = require("../models");

const DeliveryBoy  = db.DeliveryBoy ;


exports.create = async (req, res) => {
    try {
      const { name, mobile, password, address, bonus,status } = req.body;

      const existing = await DeliveryBoy.findOne({ where: { mobile } });
      if (existing)
        return res.status(400).json({ message: "Mobile already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const data = await DeliveryBoy.create({
        name,
        mobile,
        password: hashedPassword,
        address,
        bonus,
        status
      });

      res.json({ message: "Delivery Boy created successfully", data });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};


exports.getAll = async (req, res) => {

    try {
      const data = await DeliveryBoy.findAll({
        attributes: { exclude: ['password'] },
        order: [['id', 'DESC']]
      });

      res.json({ data });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
      const data = await DeliveryBoy.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
      });

      if (!data)
        return res.status(404).json({ message: "Not found" });

      res.json({ data });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
      const id = req.params.id;

      const deliveryBoy = await DeliveryBoy.findByPk(id);
      if (!deliveryBoy)
        return res.status(404).json({ message: "Not found" });

      const { name, mobile, address, bonus, status } = req.body;

      await deliveryBoy.update({
        name,
        mobile,
        address,
        bonus,
        status
      });

      res.json({ message: "Updated successfully" });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
      const id = req.params.id;

      const deliveryBoy = await DeliveryBoy.findByPk(id);
      if (!deliveryBoy)
        return res.status(404).json({ message: "Not found" });

      await deliveryBoy.destroy();

      res.json({ message: "Deleted successfully" });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  
};
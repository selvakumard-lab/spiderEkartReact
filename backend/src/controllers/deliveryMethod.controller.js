
const db = require("../models");

const DeliveryMethod  = db.DeliveryMethod ;


exports.saveAllMethods = async (req, res) => {
  try {
    
    const methods = req.body.methods;

    for (let m of methods) {
      const existing = await DeliveryMethod.findOne({
        where: { type: m.type },
      });

      if (existing) {
        await existing.update({
          is_active: m.is_active,
          config: m.config,
        });
      } else {
        await DeliveryMethod.create({
          type: m.type,
          is_active: m.is_active,
          config: m.config,
        });
      }
    }

    res.json({ success: true, message: "Delivery settings saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getMethods = async (req, res) => {

  const data = await DeliveryMethod.findAll();

  res.json(data);
};



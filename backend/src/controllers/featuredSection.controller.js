
const db = require("../models");

const FeaturedSection  = db.FeaturedSection ;


exports.create = async (req, res) => {
  try {

    await FeaturedSection.create(req.body);

    res.json({ success:true, message:"Featured section created" });

  } catch(err){
    res.status(400).json({ message: err.message });
  }
};


exports.getAll = async (req, res) => {
  const data = await FeaturedSection.findAll({ order: [["id","DESC"]] });
  res.json({ success:true, data });
};

exports.update = async (req, res) => {
  try {

    await FeaturedSection.update(req.body, {
      where:{ id:req.params.id }
    });

    res.json({ success:true, message:"Updated successfully" });

  } catch(err){
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  await FeaturedSection.destroy({ where:{ id:req.params.id } });
  res.json({ success:true, message:"Deleted successfully" });
};
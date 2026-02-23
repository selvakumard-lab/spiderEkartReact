
const db = require("../models");

const PromoCode  = db.PromoCode ;


exports.createPromoCode = async (req, res) => {
    try{

        const exist = await PromoCode.findOne({where:{code:req.body.code}});
        if(exist) return res.status(400).json({message:"Promo code already exists"});

        await PromoCode.create(req.body);

        res.json({message:"Promo code created successfully"});

    }catch(err){
        res.status(500).json({message:err.message});
    }
};


exports.getPromoCode = async (req, res) => {

    try{
        const data = await PromoCode.findAll({ order:[["id","DESC"]] });
        res.json({data});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.updatePromoCode = async (req, res) => {
    try{
        const promo = await PromoCode.findByPk(req.params.id);
        if(!promo) return res.status(404).json({message:"Promo not found"});

        await promo.update(req.body);

        res.json({message:"Promo updated successfully"});

    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.removePromoCode = async (req, res) => {
    try{
        const promo = await PromoCode.findByPk(req.params.id);
        if(!promo) return res.status(404).json({message:"Promo not found"});

        await promo.destroy();

        res.json({message:"Promo deleted successfully"});

    }catch(err){
        res.status(500).json({message:err.message});
    }
};
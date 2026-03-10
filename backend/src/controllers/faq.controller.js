const db = require("../models");
const Faq = db.Faq;


exports.storeFaq = async (req, res) => {

  try {

    const faqData = req.body.faq;

    if (!Array.isArray(faqData)) {
      return res.status(400).json({
        message: "FAQ must be an array"
      });
    }

    const created = await Faq.bulkCreate(faqData);

    res.json({
      success: true,
      message: "FAQ stored successfully",
      data: created
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// GET FAQ LIST
exports.getFaq = async (req, res) => {

  try {

    const faqs = await Faq.findAll({
      order: [["id", "ASC"]]
    });

    res.json({
      success: true,
      data: faqs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
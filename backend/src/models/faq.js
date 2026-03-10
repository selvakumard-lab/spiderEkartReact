'use strict';

module.exports = (sequelize, DataTypes) => {

  const Faq = sequelize.define("Faq", {

    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  }, {
    tableName: "faqs",
    timestamps: true
  });

  return Faq;

};
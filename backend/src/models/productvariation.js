'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class ProductVariation extends Model {

    static associate(models) {

      ProductVariation.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product"
      });

    }

  }

  ProductVariation.init({

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    product_id: {
      type: DataTypes.INTEGER
    },

    measurement: {
      type: DataTypes.STRING
    },

    unit: {
      type: DataTypes.STRING
    },

    weight: {
      type: DataTypes.FLOAT
    },

    mrp: {
      type: DataTypes.FLOAT
    },

    selling_price: {
      type: DataTypes.FLOAT
    },

    product_price: {
      type: DataTypes.FLOAT
    },

    stock: {
      type: DataTypes.INTEGER
    },

    status: {
      type: DataTypes.STRING
    }

  }, {

    sequelize,
    modelName: 'ProductVariation',
    tableName: "productVariations",

  });

  return ProductVariation;

};
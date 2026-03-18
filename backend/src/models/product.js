'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Product extends Model {

    /**
     * Associations
     */

    static associate(models) {

      // Product -> Variations
      Product.hasMany(models.ProductVariation, {
        foreignKey: "product_id",
        as: "variations",
        onDelete: "CASCADE"
      });

    }

  }

  Product.init({

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    category: {
      type: DataTypes.INTEGER
    },

    sub_category: {
      type: DataTypes.INTEGER
    },

    brand: {
      type: DataTypes.INTEGER
    },

    price_type: {
      type: DataTypes.STRING
    },

    hsn: {
      type: DataTypes.STRING
    },

    sgst: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },

    cgst: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },

    igst: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },

    type: {
      type: DataTypes.STRING
    },

    description: {
      type: DataTypes.TEXT
    },

    main_image: {
      type: DataTypes.STRING
    },

    other_images: {
      type: DataTypes.TEXT
    },

    minimum_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "Enabled"
    }

  }, {

    sequelize,
    modelName: 'Product',
    tableName: "products",
    timestamps: true

  });

  return Product;

};
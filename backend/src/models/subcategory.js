'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubCategory.init({
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SubCategory',
  });

  SubCategory.associate = (models) => {
    SubCategory.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  };

  
  return SubCategory;
};
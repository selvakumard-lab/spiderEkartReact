'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryBoy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DeliveryBoy.init({
    name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.TEXT,
    bonus: DataTypes.FLOAT,
    balance: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DeliveryBoy',
    tableName: "deliveryboys",
  });
  return DeliveryBoy;
};
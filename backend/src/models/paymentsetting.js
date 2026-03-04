'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentSetting.init({
      codStatus: DataTypes.BOOLEAN,

      razorpayStatus: DataTypes.BOOLEAN,
      razorpayApiKey: DataTypes.STRING,
      razorpaySecretKey: DataTypes.STRING,

      billplzStatus: DataTypes.BOOLEAN,
      billplzApiUrl: DataTypes.STRING,
      billplzAppUrl: DataTypes.STRING,
      billplzApiKey: DataTypes.STRING,
      billplzCollectionId: DataTypes.STRING,

      phonepeStatus: DataTypes.BOOLEAN,
      phonepeMerchantId: DataTypes.STRING,
      phonepeSecretKey: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'PaymentSetting',
    tableName: "payment_settings",
  });
  return PaymentSetting;
};
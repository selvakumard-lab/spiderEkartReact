'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Setting.init({
    
    appName: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    supportNumber: DataTypes.STRING,
    supportEmail: DataTypes.STRING,
    logoimage: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zone: DataTypes.STRING,
    storeMapApi: DataTypes.TEXT,
    address: DataTypes.TEXT,
    storeLatitude: DataTypes.STRING,
    storeLongitude: DataTypes.STRING,
    gstNumber: DataTypes.STRING,
    fssaiNumber: DataTypes.STRING,
    stampimage: DataTypes.STRING,
    currentVersion: DataTypes.STRING,
    minVersion: DataTypes.STRING,
    versionStatus: DataTypes.BOOLEAN,
    currency: DataTypes.STRING,
    tax: DataTypes.FLOAT,
    deliveryCharge: DataTypes.FLOAT,
    freeDeliveryMin: DataTypes.FLOAT,
    timezone: DataTypes.STRING,
    referEarnSystem: DataTypes.BOOLEAN,
    minReferEarnOrderAmount: DataTypes.FLOAT,
    referEarnBonus: DataTypes.FLOAT,
    referEarnMethod: DataTypes.STRING,
    maxReferEarnAmount: DataTypes.FLOAT,
    minWithdrawalAmount: DataTypes.FLOAT,
    maxDaysToReturn: DataTypes.INTEGER,
    deliveryBoyBonus: DataTypes.FLOAT,
    fromEmail: DataTypes.STRING,
    replyToEmail: DataTypes.STRING,
    mailUsername: DataTypes.STRING,
    mailPassword: DataTypes.STRING,
    smtpHost: DataTypes.STRING,
    smtpSecure: DataTypes.STRING,
    smtpPort: DataTypes.INTEGER,
    loginWithSmsOtp: DataTypes.BOOLEAN,
    about_us: DataTypes.STRING,
    contact_us: DataTypes.STRING,
    terms_conditions: DataTypes.STRING,
    privacy_policy: DataTypes.STRING,
    refund_policy: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Setting',
    tableName: 'settings',
  });
  return Setting;
};
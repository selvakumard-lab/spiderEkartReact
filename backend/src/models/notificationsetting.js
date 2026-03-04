'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotificationSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NotificationSetting.init({
    fcmServerKey: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'NotificationSetting',
    tableName: "notification_settings",
  });
  return NotificationSetting;
};
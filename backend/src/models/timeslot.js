"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TimeSlot extends Model {}

  TimeSlot.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      fromTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      toTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      lastOrderTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        defaultValue: "Active",
      },
    },
    {
      sequelize,
      modelName: "TimeSlot",
      tableName: "timeslots",
    }
  );

  return TimeSlot;
};
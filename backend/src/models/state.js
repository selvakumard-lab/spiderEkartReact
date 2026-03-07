'use strict';

module.exports = (sequelize, DataTypes) => {

  const State = sequelize.define('State', {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {

    tableName: "states",
    timestamps: true

  });

  return State;
};
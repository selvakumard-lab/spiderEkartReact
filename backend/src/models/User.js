'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Association will be added here
      User.hasOne(models.TenantMaster, {
        foreignKey: "user_id",
        sourceKey: "id"
      });
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    otp: DataTypes.STRING,
    otp_expire: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    role: DataTypes.STRING,
    project_slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });

  return User;
};
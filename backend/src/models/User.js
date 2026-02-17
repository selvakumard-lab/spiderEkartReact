'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      module.exports = (sequelize, DataTypes) => {
        const User = sequelize.define("User", {
          name: DataTypes.STRING,
          email: DataTypes.STRING,
          password: DataTypes.STRING,
          otp: DataTypes.STRING,
          otp_expire: DataTypes.STRING,
          
          role: DataTypes.STRING,
          project_slug: DataTypes.STRING,
        });

        return User;
      };


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
  });
  return User;
};
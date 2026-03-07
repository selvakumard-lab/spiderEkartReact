// 'use strict';

// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {

//   class District extends Model {

//     static associate(models) {

//       District.belongsTo(models.State, {
//         foreignKey: "state_id"
//       });

//     }

//   }

//   District.init({

//     state_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },

//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }

//   }, {
//     sequelize,
//     modelName: 'District',
//     tableName: 'districts'
//   });

//   return District;
// };


module.exports = (sequelize, DataTypes) => {

  const District = sequelize.define("District", {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    state_id: {
      type: DataTypes.INTEGER
    },

    name: {
      type: DataTypes.STRING
    }

  }, {
    tableName: "districts"
  });

  District.associate = function(models) {

    District.belongsTo(models.State, {
      foreignKey: "state_id"
    });

    District.hasMany(models.City, {
      foreignKey: "district_id"
    });

  };

  return District;

};
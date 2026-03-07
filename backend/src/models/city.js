module.exports = (sequelize, DataTypes) => {

  const City = sequelize.define("City", {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    district_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {
    tableName: "cities"
  });

  City.associate = function(models) {

    City.belongsTo(models.District, {
      foreignKey: "district_id"
    });

    City.hasMany(models.Area, {
      foreignKey: "city_id",
    });

  };

  return City;

};
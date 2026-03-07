module.exports = (sequelize, DataTypes) => {

  const Area = sequelize.define(
    "Area",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      area_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      pincode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "areas",
    }
  );

  Area.associate = function (models) {

    Area.belongsTo(models.City, {
      foreignKey: "city_id",
    });

  };

  return Area;
};
module.exports = (sequelize, DataTypes) => {
  const HomeBanner = sequelize.define("HomeBanner", {
    slider_type: DataTypes.STRING,
    type: DataTypes.STRING,
    ref_id: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    tableName: "home_banners"
  });

  return HomeBanner;
};
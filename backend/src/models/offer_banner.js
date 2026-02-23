module.exports = (sequelize, DataTypes) => {
  const OfferBanner = sequelize.define("OfferBanner", {

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    tableName: "offer_banners",
  });

  return OfferBanner;
};
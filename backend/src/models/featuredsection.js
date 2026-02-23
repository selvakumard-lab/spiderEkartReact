module.exports = (sequelize, DataTypes) => {

  const FeaturedSection = sequelize.define("FeaturedSection", {

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    short_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    placed_in: {
      type: DataTypes.ENUM("top", "bottom"),
      defaultValue: "top",
    },

    section_style: {
      type: DataTypes.ENUM("style1", "style2", "style3"),
      defaultValue: "style1",
    },

    product_ids: {
      type: DataTypes.TEXT,
      allowNull: false,
    }

  }, {
    tableName: "featured_sections",
    timestamps: true,
    underscored: true,
  });

  return FeaturedSection;
};
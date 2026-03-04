module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {

    type: {
      type: DataTypes.ENUM("default", "category", "product"),
      allowNull: false
    },

    ref_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    include_image: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true
    }

  },{
    tableName: "promocodes",
    timestamps: true,
    underscored: true,
  });

  return Notification;
};
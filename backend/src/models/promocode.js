module.exports = (sequelize, DataTypes) => {

  const PromoCode = sequelize.define("PromoCode", {

    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    message: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    users_limit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    min_order_amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    discount_type: {
      type: DataTypes.ENUM("percentage", "amount"),
      defaultValue: "percentage",
    },

    max_discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    repeat_usage: {
      type: DataTypes.ENUM("allowed", "not_allowed"),
      defaultValue: "not_allowed",
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },

  }, {
    tableName: "promocodes",
    timestamps: true,
    underscored: true,
  });

  return PromoCode;
};
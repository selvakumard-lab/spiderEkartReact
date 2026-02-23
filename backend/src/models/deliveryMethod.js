module.exports = (sequelize, DataTypes) => {
  const DeliveryMethod = sequelize.define(
    "DeliveryMethod",
    {
      type: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      config: DataTypes.JSON,
    },
    {
      tableName: "delivery_methods",
      freezeTableName: true,
      timestamps: false
    }
  );

  return DeliveryMethod;
};

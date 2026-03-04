"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("timeslots", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      fromTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      toTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      lastOrderTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM("Active", "Inactive"),
        defaultValue: "Active",
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("timeslots");
  },
};
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("delivery_methods", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      config: {
        type: Sequelize.JSON,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("delivery_methods");
  },
};

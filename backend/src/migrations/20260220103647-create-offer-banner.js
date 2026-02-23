"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("offer_banners", {

      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("offer_banners");
  },
};
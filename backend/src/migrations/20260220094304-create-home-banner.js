"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("home_banners", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      slider_type: {
        type: Sequelize.ENUM("app", "web"),
        allowNull: false,
      },

      type: {
        type: Sequelize.ENUM("default", "category", "product"),
        allowNull: false,
      },

      ref_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
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

  async down(queryInterface) {
    await queryInterface.dropTable("home_banners");
  },
};
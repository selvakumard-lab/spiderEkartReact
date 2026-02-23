"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable("featured_sections", {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      short_description: {
        type: Sequelize.STRING,
      },

      placed_in: {
        type: Sequelize.ENUM("top", "bottom"),
        defaultValue: "top",
      },

      section_style: {
        type: Sequelize.ENUM("style1", "style2", "style3"),
        defaultValue: "style1",
      },

      product_ids: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable("featured_sections");
  },
};
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      type: {
        type: Sequelize.ENUM("default", "category", "product"),
        allowNull: false
      },

      ref_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false
      },

      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      include_image: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      image: {
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('notifications');
  }
};
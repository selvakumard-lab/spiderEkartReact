'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('promocodes', {

      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },

      message: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      start_date: {
        type: Sequelize.DATEONLY
      },

      end_date: {
        type: Sequelize.DATEONLY
      },

      users_limit: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      min_order_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },

      discount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },

      discount_type: {
        type: Sequelize.ENUM("percentage","amount"),
        allowNull: false,
        defaultValue: "percentage"
      },

      max_discount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },

      repeat_usage: {
        type: Sequelize.ENUM("allowed","not_allowed"),
        defaultValue: "not_allowed"
      },

      status: {
        type: Sequelize.ENUM("active","inactive"),
        defaultValue: "active"
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('promocodes');
  }
};
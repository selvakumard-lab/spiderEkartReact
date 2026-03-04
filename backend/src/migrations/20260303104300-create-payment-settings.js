"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payment_settings", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      codStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      razorpayStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      razorpayApiKey: {
        type: Sequelize.STRING,
      },
      razorpaySecretKey: {
        type: Sequelize.STRING,
      },

      billplzStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      billplzApiUrl: {
        type: Sequelize.STRING,
      },
      billplzAppUrl: {
        type: Sequelize.STRING,
      },
      billplzApiKey: {
        type: Sequelize.STRING,
      },
      billplzCollectionId: {
        type: Sequelize.STRING,
      },

      phonepeStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      phonepeMerchantId: {
        type: Sequelize.STRING,
      },
      phonepeSecretKey: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("payment_settings");
  },
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appName: {
        type: Sequelize.STRING
      },
      whatsapp: {
        type: Sequelize.STRING
      },
      supportNumber: {
        type: Sequelize.STRING
      },
      supportEmail: {
        type: Sequelize.STRING
      },
      logoimage: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      zone: {
        type: Sequelize.STRING
      },
      storeMapApi: {
        type: Sequelize.TEXT
      },
      address: {
        type: Sequelize.TEXT
      },
      storeLatitude: {
        type: Sequelize.STRING
      },
      storeLongitude: {
        type: Sequelize.STRING
      },
      gstNumber: {
        type: Sequelize.STRING
      },
      fssaiNumber: {
        type: Sequelize.STRING
      },
      stampimage: {
        type: Sequelize.STRING
      },
      currentVersion: {
        type: Sequelize.STRING
      },
      minVersion: {
        type: Sequelize.STRING
      },
      versionStatus: {
        type: Sequelize.BOOLEAN
      },
      currency: {
        type: Sequelize.STRING
      },
      tax: {
        type: Sequelize.FLOAT
      },
      deliveryCharge: {
        type: Sequelize.FLOAT
      },
      freeDeliveryMin: {
        type: Sequelize.FLOAT
      },
      timezone: {
        type: Sequelize.STRING
      },
      referEarnSystem: {
        type: Sequelize.BOOLEAN
      },
      minReferEarnOrderAmount: {
        type: Sequelize.FLOAT
      },
      referEarnBonus: {
        type: Sequelize.FLOAT
      },
      referEarnMethod: {
        type: Sequelize.STRING
      },
      maxReferEarnAmount: {
        type: Sequelize.FLOAT
      },
      minWithdrawalAmount: {
        type: Sequelize.FLOAT
      },
      maxDaysToReturn: {
        type: Sequelize.INTEGER
      },
      deliveryBoyBonus: {
        type: Sequelize.FLOAT
      },
      fromEmail: {
        type: Sequelize.STRING
      },
      replyToEmail: {
        type: Sequelize.STRING
      },
      mailUsername: {
        type: Sequelize.STRING
      },
      mailPassword: {
        type: Sequelize.STRING
      },
      smtpHost: {
        type: Sequelize.STRING
      },
      smtpSecure: {
        type: Sequelize.STRING
      },
      smtpPort: {
        type: Sequelize.INTEGER
      },
      loginWithSmsOtp: {
        type: Sequelize.BOOLEAN
      },

      about_us: {
        type: Sequelize.STRING
      },
      contact_us: {
        type: Sequelize.STRING
      },
      terms_conditions: {
        type: Sequelize.STRING
      },
      privacy_policy: {
        type: Sequelize.STRING
      },
      refund_policy: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('settings');
  }
};
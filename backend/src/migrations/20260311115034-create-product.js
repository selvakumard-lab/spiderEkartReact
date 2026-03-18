'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.INTEGER
      },
      sub_category: {
        type: Sequelize.INTEGER
      },
      brand: {
        type: Sequelize.INTEGER
      },
      price_type: {
        type: Sequelize.STRING
      },
      hsn: {
        type: Sequelize.STRING
      },
      sgst: {
        type: Sequelize.FLOAT
      },
      cgst: {
        type: Sequelize.FLOAT
      },
      igst: {
        type: Sequelize.FLOAT
      },
      type: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      main_image: {
        type: Sequelize.STRING
      },
      other_images: {
        type: Sequelize.TEXT
      },
      minimum_stock: {
        type: Sequelize.INTEGER
      },
      status: {
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
    await queryInterface.dropTable('products');
  }
};
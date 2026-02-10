'use strict';
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    const password = await bcrypt.hash("superadmin", 10);

    await queryInterface.bulkInsert("Users", [
      {
        name: "Super Admin",
        email: "superadmin@gmail.com",
        password: password,
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", {
      email: "admin@spider.com",
    });
  }
};

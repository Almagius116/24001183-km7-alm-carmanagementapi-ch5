"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "superAdmin";
    const hashedPassword = await bcrypt.hash(password, 10);
    await queryInterface.bulkInsert("Users", [
      {
        username: "superAdmin",
        password: hashedPassword,
        role: "super admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

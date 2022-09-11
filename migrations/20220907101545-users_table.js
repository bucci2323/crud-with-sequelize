"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(20),
        required: true,
        trim: true,
      },
      email: {
        type: Sequelize.STRING(),
        unique: true,
        required: true,
      },
      password: {
        type: Sequelize.STRING(20),
        required: true,
      },
      passcode: {
        type: Sequelize.STRING(4),
        required: true,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};

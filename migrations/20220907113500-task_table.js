"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tasks", {
      id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING(),
        required: true,
      },
      completed: {
        type: Sequelize.BOOLEAN(),
        default: false,
      },
      user_id: {
        type: Sequelize.INTEGER(),
        required: true,
        references: {
          model: "users",
        },
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tasks");
  },
};

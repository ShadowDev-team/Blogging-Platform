'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
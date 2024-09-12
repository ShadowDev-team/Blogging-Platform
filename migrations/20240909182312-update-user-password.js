'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.STRING(100),
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
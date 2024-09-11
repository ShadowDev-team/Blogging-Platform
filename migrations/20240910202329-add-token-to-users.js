'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'token', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      after: 'email' // This will add the column after the 'email' column
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'token');
  }
};

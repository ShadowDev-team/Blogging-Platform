'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'bio', {
      type: Sequelize.STRING, // or Sequelize.TEXT if you expect longer bio texts
      allowNull: true, // or false, depending on your requirements
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'bio');
  }
};

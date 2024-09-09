const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

// Create Sequelize instance
const sequelize = new Sequelize(config.development);

// Test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

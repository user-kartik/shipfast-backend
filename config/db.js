const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' // SQLite file storage
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('SQLite connected');
    } catch (error) {
        console.error('Unable to connect to SQLite:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };

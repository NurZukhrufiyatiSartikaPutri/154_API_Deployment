const db = require('../models');

async function connectDB() {
    try {
        await db.sequelize.authenticate();
        console.log('Database connection successfully');

        await db.sequelize.sync({ alter: false });
        console.log('Database synchronized ');

    } catch (error) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
    
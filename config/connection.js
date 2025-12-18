import { Sequelize } from 'sequelize';

import sqlite3Adapter from '../utils/sqlite3-adapter.js';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    dialectModule: sqlite3Adapter
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Connected to SQLite database successfully! at 127.0.0.1:5000");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

export { sequelize, connectDB };

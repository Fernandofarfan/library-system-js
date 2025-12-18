import { Sequelize } from 'sequelize';
import { sequelize } from './config/connection.js'; // Adjust the path as per your project structure
import User from './models/user.js';
import Book from './models/book.js';
import Review from './models/review.js';

async function migrate() {
  try {
    // Assuming sequelize is correctly imported and instantiated in './config/connection.js'

    // Create tables
    await User.sync({ force: true });
    await Book.sync({ force: true });
    await Review.sync({ force: true });

    console.log('Database synchronized');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    // Close the connection
    if (sequelize) {
      await sequelize.close();
      console.log('Database connection closed');
    }
  }
}

migrate();

import User from './models/user.js';
import Book from './models/book.js';
import { sequelize } from './config/connection.js';

async function seed() {
    try {
        // Clear and create tables if not already done
        await sequelize.sync({ force: true });

        // Create a test user
        await User.create({
            username: 'fernando',
            email: 'fernando@ejemplo.com',
            password: 'password123' // This will be hashed automatically by the model hook
        });

        // Create some books
        await Book.create({
            ISBN: '978-0142437230',
            title: 'Don Quijote de la Mancha',
            author: 'Miguel de Cervantes'
        });

        await Book.create({
            ISBN: '978-0307474728',
            title: 'Cien años de soledad',
            author: 'Gabriel García Márquez'
        });

        await Book.create({
            ISBN: '978-8420674208',
            title: 'El Aleph',
            author: 'Jorge Luis Borges'
        });

        console.log('✅ Base de datos poblada con éxito.');
        console.log('--- Datos de prueba ---');
        console.log('Usuario: fernando');
        console.log('Contraseña: password123');
    } catch (error) {
        console.error('❌ Error al poblar la base de datos:', error);
    } finally {
        await sequelize.close();
    }
}

seed();

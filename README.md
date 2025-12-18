# Sistema de Gestión de Biblioteca (JS)

Este es un sistema de gestión de biblioteca desarrollado con Node.js, Express y Sequelize. Permite gestionar libros, reseñas de usuarios y autenticación.

## Autor
**Fernando Farfán**

## Características
- Registro e inicio de sesión de usuarios.
- Búsqueda de libros por título, autor o ISBN.
- Sistema de reseñas para libros.
- Interfaz web moderna para visualización.

## Tecnologías Utilizadas
- **Node.js**: Entorno de ejecución para el servidor.
- **Express**: Framework web para la API.
- **Sequelize**: ORM para la gestión de la base de datos SQLite.
- **JWT**: Autenticación basada en tokens.
- **CSS Vanilla**: Diseño moderno y responsivo.

## Cómo Empezar

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```

2.  **Migrar la base de datos**:
    ```bash
    node migrate.js
    ```

3.  **Ejecutar el servidor**:
    ```bash
    npm start
    ```

4.  **Acceder a la aplicación**:
    Abre tu navegador en `http://localhost:5000`

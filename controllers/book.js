import book from "../models/book.js"

export async function getAllBooks(req, res) {
    try {
        const books = await book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "¡Error interno del servidor!" });
    }
}

export async function addBook(req, res) {
    try {

        const foundBook = await book.findOne({ where: req.body });
        if (foundBook) {
            return res.json({ message: "¡El libro ya existe!" });
        }

        const newBook = await book.create(req.body);
        res.json({ message: "¡Libro añadido con éxito!" });

    } catch (error) {
        res.status(500).json({ message: "¡Error interno del servidor!" });
    }
}

export async function getBooksByISBN(req, res) {
    try {

        const { ISBN } = req.body;

        if (!ISBN) {
            return res.json({ message: "¡Por favor, proporciona un código ISBN válido!" });
        }

        const foundBooks = await book.findAll({ where: { ISBN } });
        if (foundBooks.length) {
            return res.json({ message: "¡Libros encontrados!", foundBooks });
        }

        res.json({ message: "¡No se encontró ningún libro con este código ISBN!" });
    } catch (error) {

        res.status(500).json({ message: "¡Error interno del servidor!" });

    }
}

export async function getBooksByTitle(req, res) {
    try {

        const { title } = req.body;

        if (!title) {
            return res.json({ message: "¡Por favor, proporciona un título válido!" });
        }

        const foundBooks = await book.findAll({ where: { title } });
        if (foundBooks.length) {
            return res.json({ message: "¡Libros encontrados!", foundBooks });
        }

        res.json({ message: "¡No se encontró ningún libro con este título!" });

    } catch (error) {
        res.status(500).json({ message: "¡Error interno del servidor!" });
    }
}

export async function getBooksByAuthor(req, res) {
    try {

        const { author } = req.body;

        if (!author) {
            return res.json({ message: "¡Por favor, proporciona un nombre de autor válido!" });
        }

        const foundBooks = await book.findAll({ where: { author } });
        if (foundBooks.length) {
            return res.json({ message: "¡Libros encontrados!", foundBooks });
        }

        res.json({ message: "¡No se encontró ningún libro con este nombre de autor!" });

    } catch (error) {
        res.status(500).json({ message: "¡Error interno del servidor!" });
    }
}


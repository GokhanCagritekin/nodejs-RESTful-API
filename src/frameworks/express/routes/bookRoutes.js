const express = require('express');
const router = express.Router();

function bookRoutes(bookController) {
    // Route to create a new book
    router.post('/books', async (req, res) => {
        try {
            const { title, author, price, isbn, language, numPages, publisher } = req.body;
            const result = await bookController.createBook(title, author, price, isbn, language, numPages, publisher);
            res.status(201).json({ message: 'Book created successfully', bookId: result });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Route to get all books
    router.get('/books', async (req, res) => {
        try {
            const books = await bookController.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Route to get a book by its ID
    router.get('/books/:id', async (req, res) => {
        try {
            const bookId = req.params.id;
            const book = await bookController.getBookById(bookId);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Route to update a book by its ID
    router.put('/books/:id', async (req, res) => {
        try {
            const bookId = req.params.id;
            const { title, author, price, isbn, language, numPages, publisher } = req.body;
            const updated = await bookController.updateBook(bookId, { title, author, price, isbn, language, numPages, publisher });
            if (!updated) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json({ message: 'Book updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Route to delete a book by its ID
    router.delete('/books/:id', async (req, res) => {
        try {
            const bookId = req.params.id;
            const deleted = await bookController.deleteBook(bookId);
            if (!deleted) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return router;
}

module.exports = bookRoutes;

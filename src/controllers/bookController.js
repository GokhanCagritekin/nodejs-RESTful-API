const Book = require('../core/entities/book');

class BookController {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async createBook(title, author, price, isbn, language, numPages, publisher) {
        // Create a new book object
        const book = new Book(title, author, price, isbn, language, numPages, publisher);
        // Save the book to the database
        return await this.bookRepository.create(book);
    }

    async getAllBooks() {
        // Retrieve all books from the database
        return await this.bookRepository.getAll();
    }

    async getBookById(bookId) {
        // Retrieve a book by its ID from the database
        return await this.bookRepository.getById(bookId);
    }

    async updateBook(bookId, updatedFields) {
        // Update a book by its ID in the database
        return await this.bookRepository.update(bookId, updatedFields);
    }

    async deleteBook(bookId) {
        // Delete a book by its ID from the database
        return await this.bookRepository.delete(bookId);
    }
}

module.exports = BookController;

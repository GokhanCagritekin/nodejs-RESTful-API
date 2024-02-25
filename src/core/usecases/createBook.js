const Book = require('../entities/book');

class CreateBook {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(title, author, price, isbn, language, numPages, publisher) {
        const book = new Book(title, author, price, isbn, language, numPages, publisher);
        return await this.bookRepository.create(book);
    }
}

module.exports = CreateBook;
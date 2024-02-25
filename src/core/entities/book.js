class Book {
    constructor(title, author, price, isbn, language, numPages, publisher) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.isbn = isbn;
        this.language = language;
        this.numPages = numPages;
        this.publisher = publisher;
    }
}

module.exports = Book;
class DeleteBook {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(bookId) {
        return await this.bookRepository.delete(bookId);
    }
}

module.exports = DeleteBook;

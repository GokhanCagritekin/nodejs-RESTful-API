class GetBookById {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(bookId) {
        return await this.bookRepository.getById(bookId);
    }
}

module.exports = GetBookById;

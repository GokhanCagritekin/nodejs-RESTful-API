class UpdateBook {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(bookId, updatedData) {
        return await this.bookRepository.update(bookId, updatedData);
    }
}

module.exports = UpdateBook;

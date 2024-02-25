class GetAllBooks {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute() {
        return await this.bookRepository.getAll();
    }
}

module.exports = GetAllBooks;
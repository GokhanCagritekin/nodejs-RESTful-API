class BookRepository {
    constructor() {
        if (new.target === BookRepository) {
            throw new TypeError("Cannot instantiate abstract class");
        }
    }

    async create(book) {
        throw new Error("Method not implemented");
    }

    async getAll() {
        throw new Error("Method not implemented");
    }

    async getById(bookId) {
        throw new Error("Method not implemented");
    }

    async update(bookId, updatedData) {
        throw new Error("Method not implemented");
    }

    async delete(bookId) {
        throw new Error("Method not implemented");
    }
}

module.exports = BookRepository;

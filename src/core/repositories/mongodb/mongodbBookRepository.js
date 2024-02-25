const BookRepository = require('../bookRepository');
var mongoose = require('mongoose');

class MongoDBBookRepository extends BookRepository {
    constructor(db) {
        super();
        this.collection = db.collection('books');
    }

    async create(book) {
        const result = await this.collection.insertOne(book);
        return result.insertedId;
    }

    async getAll() {
        const books = await this.collection.find().toArray();
        return books;
    }

    async getById(bookId) {
        const book = await this.collection.findOne({ _id: bookId });
        return book;
    }

    async update(bookId, updatedData) {
        var bookObjId = new mongoose.Types.ObjectId(bookId.toString()); 
        const result = await this.collection.updateOne({ _id: bookObjId }, { $set: updatedData });
        return result.modifiedCount > 0;
    }

    async delete(bookId) {
        var bookObjId = new mongoose.Types.ObjectId(bookId.toString());              
        const result = await this.collection.deleteOne({ _id: bookObjId });
        return result.deletedCount > 0;
    }
}

module.exports = MongoDBBookRepository;
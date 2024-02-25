const MongoDBBookRepository = require('core/repositories/mongodb/MongoDBBookRepository');
var mongoose = require('mongoose');

describe('BookRepository', () => {
    let bookRepository;

    beforeEach(() => {
        // Create a mock MongoDB collection
        const collection = {
            insertOne: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn()
        };

        // Create a mock MongoDB database object
        const db = {
            collection: jest.fn().mockReturnValue(collection)
        };

        // Create a new BookRepository instance
        bookRepository = new MongoDBBookRepository(db);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should insert a book into the collection and return the inserted ID', async () => {
            // Define test book data
            const book = { title: 'Test Book', author: 'Test Author' };
    
            // Mock the insertOne method to resolve with insertedId
            bookRepository.collection.insertOne.mockResolvedValue({ insertedId: '123456' });
    
            // Call create method
            const result = await bookRepository.create(book);
    
            // Verify that insertOne was called with the correct book data
            expect(bookRepository.collection.insertOne).toHaveBeenCalledWith(book);
    
            // Verify that the result is the inserted ID
            expect(result).toBe('123456');
        });
    
        it('should throw an error if insertion fails', async () => {
            // Define test book data
            const book = { title: 'Test Book', author: 'Test Author' };
    
            // Mock the insertOne method to reject with an error
            const expectedError = new Error('Failed to insert book');
            bookRepository.collection.insertOne.mockRejectedValue(expectedError);
    
            // Call create method and expect it to throw an error
            await expect(bookRepository.create(book)).rejects.toThrow(expectedError);
    
            // Verify that insertOne was called with the correct book data
            expect(bookRepository.collection.insertOne).toHaveBeenCalledWith(book);
        });
    });
    
    describe('getById', () => {
        it('should return the book with the given ID if found', async () => {
            // Define test book ID
            const bookId = '123456';
    
            // Define the expected book data
            const expectedBook = { _id: bookId, title: 'Test Book', author: 'Test Author' };
    
            // Mock the findOne method to resolve with the expected book
            bookRepository.collection.findOne.mockResolvedValue(expectedBook);
    
            // Call getById method
            const result = await bookRepository.getById(bookId);
    
            // Verify that findOne was called with the correct book ID
            expect(bookRepository.collection.findOne).toHaveBeenCalledWith({ _id: bookId });
    
            // Verify that the result is the expected book
            expect(result).toEqual(expectedBook);
        });
    
        it('should return null if no book is found with the given ID', async () => {
            // Define test book ID
            const bookId = '123456';
    
            // Mock the findOne method to resolve with null
            bookRepository.collection.findOne.mockResolvedValue(null);
    
            // Call getById method
            const result = await bookRepository.getById(bookId);
    
            // Verify that findOne was called with the correct book ID
            expect(bookRepository.collection.findOne).toHaveBeenCalledWith({ _id: bookId });
    
            // Verify that the result is null
            expect(result).toBeNull();
        });
    
        it('should throw an error if an error occurs during retrieval', async () => {
            // Define test book ID
            const bookId = '123456';
    
            // Mock the findOne method to reject with an error
            const expectedError = new Error('Failed to retrieve book');
            bookRepository.collection.findOne.mockRejectedValue(expectedError);
    
            // Call getById method and expect it to throw an error
            await expect(bookRepository.getById(bookId)).rejects.toThrow(expectedError);
    
            // Verify that findOne was called with the correct book ID
            expect(bookRepository.collection.findOne).toHaveBeenCalledWith({ _id: bookId });
        });
    });
    
    describe('getAll', () => {
        it('should return all books if there are books in the database', async () => {
            // Define the expected array of books
            const expectedBooks = [
                { _id: '1', title: 'Book 1', author: 'Author 1' },
                { _id: '2', title: 'Book 2', author: 'Author 2' }
            ];
    
            // Mock the find method to resolve with the expected array of books
            bookRepository.collection.find.mockReturnValue({
                toArray: jest.fn().mockResolvedValue(expectedBooks)
            });
    
            // Call getAll method
            const result = await bookRepository.getAll();
    
            // Verify that find was called
            expect(bookRepository.collection.find).toHaveBeenCalled();
    
            // Verify that the result matches the expected array of books
            expect(result).toEqual(expectedBooks);
        });
    
        it('should return an empty array if there are no books in the database', async () => {
            // Mock the find method to resolve with an empty array
            bookRepository.collection.find.mockReturnValue({
                toArray: jest.fn().mockResolvedValue([])
            });
    
            // Call getAll method
            const result = await bookRepository.getAll();
    
            // Verify that find was called
            expect(bookRepository.collection.find).toHaveBeenCalled();
    
            // Verify that the result is an empty array
            expect(result).toEqual([]);
        });
    
        it('should throw an error if an error occurs during retrieval', async () => {
            // Mock the find method to reject with an error
            const expectedError = new Error('Failed to retrieve books');
            bookRepository.collection.find.mockReturnValue({
                toArray: jest.fn().mockRejectedValue(expectedError)
            });
    
            // Call getAll method and expect it to throw an error
            await expect(bookRepository.getAll()).rejects.toThrow(expectedError);
    
            // Verify that find was called
            expect(bookRepository.collection.find).toHaveBeenCalled();
        });
    });
    
    describe('update', () => {
        it('should update the book in the database and return true if the book exists', async () => {
            // Mock the updateOne method to resolve with a modifiedCount greater than 0
            const bookId = '5feb2a94247b363028aefda5';
            const updatedData = { title: 'Updated Title' };
            const expectedResult = true;
            bookRepository.collection.updateOne.mockResolvedValue({ modifiedCount: 1 });
    
            // Call update method
            const result = await bookRepository.update(bookId, updatedData);
    
            // Verify that updateOne was called with the correct parameters
            expect(bookRepository.collection.updateOne).toHaveBeenCalledWith(
                { _id: new mongoose.Types.ObjectId(bookId.toString()) },
                { $set: updatedData }
            );
    
            // Verify that the result is true
            expect(result).toEqual(expectedResult);
        });
    
        it('should return false if the book does not exist in the database', async () => {
            // Mock the updateOne method to resolve with a modifiedCount of 0
            const bookId = '5feb2a94247b363028aefda5';
            const updatedData = { title: 'Updated Title' };
            const expectedResult = false;
            bookRepository.collection.updateOne.mockResolvedValue({ modifiedCount: 0 });
    
            // Call update method
            const result = await bookRepository.update(bookId, updatedData);
    
            // Verify that updateOne was called with the correct parameters
            expect(bookRepository.collection.updateOne).toHaveBeenCalledWith(
                { _id: new mongoose.Types.ObjectId(bookId.toString()) },
                { $set: updatedData }
            );
    
            // Verify that the result is false
            expect(result).toEqual(expectedResult);
        });
    
        it('should throw an error if an error occurs during update', async () => {
            // Mock the updateOne method to reject with an error
            const bookId = '5feb2a94247b363028aefda5';
            const updatedData = { title: 'Updated Title' };
            const expectedError = new Error('Failed to update book');
            bookRepository.collection.updateOne.mockRejectedValue(expectedError);
    
            // Call update method and expect it to throw an error
            await expect(bookRepository.update(bookId, updatedData)).rejects.toThrow(expectedError);
    
            // Verify that updateOne was called with the correct parameters
            expect(bookRepository.collection.updateOne).toHaveBeenCalledWith(
                { _id: new mongoose.Types.ObjectId(bookId.toString()) },
                { $set: updatedData }
            );
        });
    });
    
    describe('delete', () => {
        it('should delete the book from the database and return true if the book exists', async () => {
            // Mock the deleteOne method to resolve with a deletedCount greater than 0
            const bookId = '5feb2a94247b363028aefda5';
            const expectedResult = true;
            bookRepository.collection.deleteOne.mockResolvedValue({ deletedCount: 1 });
    
            // Call delete method
            const result = await bookRepository.delete(bookId);
    
            // Verify that deleteOne was called with the correct parameters
            expect(bookRepository.collection.deleteOne).toHaveBeenCalledWith({ _id: new mongoose.Types.ObjectId(bookId.toString()) });
    
            // Verify that the result is true
            expect(result).toEqual(expectedResult);
        });
    
        it('should return false if the book does not exist in the database', async () => {
            // Mock the deleteOne method to resolve with a deletedCount of 0
            const bookId = '5feb2a94247b363028aefda5';
            const expectedResult = false;
            bookRepository.collection.deleteOne.mockResolvedValue({ deletedCount: 0 });
    
            // Call delete method
            const result = await bookRepository.delete(bookId);
    
            // Verify that deleteOne was called with the correct parameters
            expect(bookRepository.collection.deleteOne).toHaveBeenCalledWith({ _id: new mongoose.Types.ObjectId(bookId.toString()) });
    
            // Verify that the result is false
            expect(result).toEqual(expectedResult);
        });
    
        it('should throw an error if an error occurs during delete', async () => {
            // Mock the deleteOne method to reject with an error
            const bookId = '5feb2a94247b363028aefda5';
            const expectedError = new Error('Failed to delete book');
            bookRepository.collection.deleteOne.mockRejectedValue(expectedError);
    
            // Call delete method and expect it to throw an error
            await expect(bookRepository.delete(bookId)).rejects.toThrow(expectedError);
    
            // Verify that deleteOne was called with the correct parameters
            expect(bookRepository.collection.deleteOne).toHaveBeenCalledWith({ _id: new mongoose.Types.ObjectId(bookId.toString()) });
        });
    });
});

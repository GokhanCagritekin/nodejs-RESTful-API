const MongoDBBookRepository = require('core/repositories/mongodb/MongoDBBookRepository');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

describe('MongoDBBookRepository', () => {
    let mongoServer;
    let connection;
    let db;
    let repository;

    beforeAll(async () => {
        // Start the in-memory MongoDB server
        mongoServer = await MongoMemoryServer.create();

        // Get the URI for the in-memory database
        const mongoUri = mongoServer.getUri();

        // Connect to the in-memory database
        connection = await MongoClient.connect(mongoUri);
        db = connection.db();
    });

    afterAll(async () => {
        // Close the database connection and stop the MongoDB server
        await connection.close();
        await mongoServer.stop();
    });

    beforeEach(() => {
        // Initialize the repository with the in-memory database connection
        repository = new MongoDBBookRepository(db);
    });

    afterEach(async () => {
        // Clean up the database after each test
        if (db) {
            await db.collection('books').deleteMany({});
        }
    });

    test('create a new book', async () => {
        // Arrange
        const book = {
            title: 'Sample Book',
            author: 'John Doe',
            price: 19.99,
            isbn: '1234567890',
            language: 'English',
            numPages: 250,
            publisher: 'Sample Publisher'
        };

        // Act
        const insertedId = await repository.create(book);

        // Assert
        expect(insertedId).toBeDefined();
    });

    test('get all books', async () => {
        // Arrange
        await repository.create({
            title: 'Sample Book 1',
            author: 'John Doe',
            price: 19.99,
            isbn: '1234567890',
            language: 'English',
            numPages: 250,
            publisher: 'Sample Publisher'
        });

        await repository.create({
            title: 'Sample Book 2',
            author: 'Jane Smith',
            price: 24.99,
            isbn: '0987654321',
            language: 'Spanish',
            numPages: 200,
            publisher: 'Sample Publisher'
        });

        // Act
        const books = await repository.getAll();

        // Assert
        expect(books).toHaveLength(2);
    });

    test('get book by ID', async () => {
        // Arrange
        const insertedId = await repository.create({
            title: 'Sample Book',
            author: 'John Doe',
            price: 19.99,
            isbn: '1234567890',
            language: 'English',
            numPages: 250,
            publisher: 'Sample Publisher'
        });

        // Act
        const book = await repository.getById(insertedId);

        // Assert
        expect(book).toBeDefined();
        expect(book.title).toBe('Sample Book');
    });

    test('update book by ID', async () => {
        // Arrange
        const insertedId = await repository.create({
            title: 'Sample Book',
            author: 'John Doe',
            price: 19.99,
            isbn: '1234567890',
            language: 'English',
            numPages: 250,
            publisher: 'Sample Publisher'
        });

        const updatedData = {
            title: 'Updated Book Title',
            price: 29.99
        };

        // Act
        const result = await repository.update(insertedId, updatedData);

        // Assert
        expect(result).toBeTruthy();

        // Check if the book has been updated
        const updatedBook = await repository.getById(insertedId);
        expect(updatedBook.title).toBe('Updated Book Title');
        expect(updatedBook.price).toBe(29.99);
    });

    test('delete book by ID', async () => {
        const insertedId = await repository.create({
            title: 'Sample Book',
            author: 'John Doe',
            price: 19.99,
            isbn: '1234567890',
            language: 'English',
            numPages: 250,
            publisher: 'Sample Publisher'
        });       

        // Act
        const deleted = await repository.delete(insertedId);

        // Assert
        expect(deleted).toBe(true);

        // Verify that the book is deleted
        const book = await repository.getById(insertedId);
        expect(book).toBeNull();
    });
});

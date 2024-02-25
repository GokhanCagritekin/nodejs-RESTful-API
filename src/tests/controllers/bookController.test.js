const BookController = require('controllers/bookController');
const Book = require('core/entities/book');

// Mock bookRepository object
const mockBookRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

// Create instance of BookController with mock bookRepository
const bookController = new BookController(mockBookRepository);

describe('BookController', () => {
    afterEach(() => {
        // Clear mock function calls after each test
        jest.clearAllMocks();
    });

    describe('createBook', () => {
        it('should call bookRepository.create with correct parameters', async () => {
            // Define test data
            const testData = {
                title: 'Test Book',
                author: 'Test Author',
                price: 9.99,
                isbn: '1234567890',
                language: 'English',
                numPages: 200,
                publisher: 'Test Publisher',
            };

            // Call createBook method with test data
            await bookController.createBook(
                testData.title,
                testData.author,
                testData.price,
                testData.isbn,
                testData.language,
                testData.numPages,
                testData.publisher
            );

            // Verify that bookRepository.create was called with correct parameters
            expect(mockBookRepository.create).toHaveBeenCalledWith(expect.any(Book));
            expect(mockBookRepository.create).toHaveBeenCalledWith(new Book(
                testData.title,
                testData.author,
                testData.price,
                testData.isbn,
                testData.language,
                testData.numPages,
                testData.publisher
            ));
        });

        it('should return the book ID when bookRepository.create resolves successfully', async () => {
            // Define test data
            const testData = {
                title: 'Test Book',
                author: 'Test Author',
                price: 9.99,
                isbn: '1234567890',
                language: 'English',
                numPages: 200,
                publisher: 'Test Publisher',
            };
            const expectedBookId = 'book123'; // Expected book ID when create succeeds

            // Mock bookRepository.create to resolve with the expected book ID
            mockBookRepository.create.mockResolvedValue(expectedBookId);

            // Call createBook method with test data
            const result = await bookController.createBook(
                testData.title,
                testData.author,
                testData.price,
                testData.isbn,
                testData.language,
                testData.numPages,
                testData.publisher
            );

            // Verify that the result is the expected book ID
            expect(result).toBe(expectedBookId);
        });

        it('should throw an error when bookRepository.create rejects with an error', async () => {
            // Define test data
            const testData = {
                title: 'Test Book',
                author: 'Test Author',
                price: 9.99,
                isbn: '1234567890',
                language: 'English',
                numPages: 200,
                publisher: 'Test Publisher',
            };
            const expectedError = new Error('Failed to create book'); // Expected error object

            // Mock bookRepository.create to reject with an error
            mockBookRepository.create.mockRejectedValue(expectedError);

            // Call createBook method with test data and expect it to throw an error
            await expect(bookController.createBook(
                testData.title,
                testData.author,
                testData.price,
                testData.isbn,
                testData.language,
                testData.numPages,
                testData.publisher
            )).rejects.toThrow(expectedError);
        });
    });

    describe('getAllBooks', () => {
        it('should call bookRepository.getAll', async () => {
            // Call getAllBooks method
            await bookController.getAllBooks();
    
            // Verify that bookRepository.getAll was called
            expect(mockBookRepository.getAll).toHaveBeenCalled();
        });
    
        it('should return an array of books', async () => {
            // Define test data for mock books
            const mockBooks = [
                new Book('Book 1', 'Author 1', 10.99, '1234567890', 'English', 200, 'Publisher 1'),
                new Book('Book 2', 'Author 2', 12.99, '0987654321', 'Spanish', 250, 'Publisher 2')
            ];
    
            // Mock bookRepository.getAll to resolve with mockBooks
            mockBookRepository.getAll.mockResolvedValue(mockBooks);
    
            // Call getAllBooks method
            const result = await bookController.getAllBooks();
    
            // Verify that the result is an array
            expect(Array.isArray(result)).toBe(true);
    
            // Verify that the result contains the mock books
            expect(result).toEqual(mockBooks);
        });
    
        it('should throw an error when bookRepository.getAll rejects with an error', async () => {
            // Define expected error
            const expectedError = new Error('Failed to retrieve books');
    
            // Mock bookRepository.getAll to reject with an error
            mockBookRepository.getAll.mockRejectedValue(expectedError);
    
            // Call getAllBooks method and expect it to throw an error
            await expect(bookController.getAllBooks()).rejects.toThrow(expectedError);
        });
    });

    describe('getBookById', () => {
        it('should call bookRepository.getById with the correct bookId', async () => {
            // Define test book ID
            const bookId = '123456';
    
            // Call getBookById method with the test book ID
            await bookController.getBookById(bookId);
    
            // Verify that bookRepository.getById was called with the correct bookId
            expect(mockBookRepository.getById).toHaveBeenCalledWith(bookId);
        });
    
        it('should return the book when bookRepository.getById resolves with a book', async () => {
            // Define test book data
            const testBook = new Book('Test Book', 'Test Author', 9.99, '1234567890', 'English', 200, 'Test Publisher');
    
            // Mock bookRepository.getById to resolve with the test book
            mockBookRepository.getById.mockResolvedValue(testBook);
    
            // Call getBookById method
            const result = await bookController.getBookById('123456');
    
            // Verify that the result is the test book
            expect(result).toEqual(testBook);
        });
    
        it('should return null when bookRepository.getById resolves with null', async () => {
            // Mock bookRepository.getById to resolve with null
            mockBookRepository.getById.mockResolvedValue(null);
    
            // Call getBookById method
            const result = await bookController.getBookById('123456');
    
            // Verify that the result is null
            expect(result).toBeNull();
        });
    
        it('should throw an error when bookRepository.getById rejects with an error', async () => {
            // Define expected error
            const expectedError = new Error('Failed to retrieve book');
    
            // Mock bookRepository.getById to reject with an error
            mockBookRepository.getById.mockRejectedValue(expectedError);
    
            // Call getBookById method and expect it to throw an error
            await expect(bookController.getBookById('123456')).rejects.toThrow(expectedError);
        });
    });
    
    describe('updateBook', () => {
        it('should call bookRepository.update with the correct parameters', async () => {
            // Define test book ID and updated fields
            const bookId = '123456';
            const updatedFields = { title: 'Updated Title', price: 19.99 };
    
            // Call updateBook method with the test book ID and updated fields
            await bookController.updateBook(bookId, updatedFields);
    
            // Verify that bookRepository.update was called with the correct parameters
            expect(mockBookRepository.update).toHaveBeenCalledWith(bookId, updatedFields);
        });
    
        it('should return true when bookRepository.update resolves successfully', async () => {
            // Mock bookRepository.update to resolve with true
            mockBookRepository.update.mockResolvedValue(true);
    
            // Call updateBook method
            const result = await bookController.updateBook('123456', {});
    
            // Verify that the result is true
            expect(result).toBe(true);
        });
    
        it('should return false when bookRepository.update resolves with false', async () => {
            // Mock bookRepository.update to resolve with false
            mockBookRepository.update.mockResolvedValue(false);
    
            // Call updateBook method
            const result = await bookController.updateBook('123456', {});
    
            // Verify that the result is false
            expect(result).toBe(false);
        });
    
        it('should throw an error when bookRepository.update rejects with an error', async () => {
            // Define expected error
            const expectedError = new Error('Failed to update book');
    
            // Mock bookRepository.update to reject with an error
            mockBookRepository.update.mockRejectedValue(expectedError);
    
            // Call updateBook method and expect it to throw an error
            await expect(bookController.updateBook('123456', {})).rejects.toThrow(expectedError);
        });
    });

    describe('deleteBook', () => {
        it('should call bookRepository.delete with the correct bookId', async () => {
            // Define test book ID
            const bookId = '123456';
    
            // Call deleteBook method with the test book ID
            await bookController.deleteBook(bookId);
    
            // Verify that bookRepository.delete was called with the correct bookId
            expect(mockBookRepository.delete).toHaveBeenCalledWith(bookId);
        });
    
        it('should return true when bookRepository.delete resolves successfully', async () => {
            // Mock bookRepository.delete to resolve with true
            mockBookRepository.delete.mockResolvedValue(true);
    
            // Call deleteBook method
            const result = await bookController.deleteBook('123456');
    
            // Verify that the result is true
            expect(result).toBe(true);
        });
    
        it('should return false when bookRepository.delete resolves with false', async () => {
            // Mock bookRepository.delete to resolve with false
            mockBookRepository.delete.mockResolvedValue(false);
    
            // Call deleteBook method
            const result = await bookController.deleteBook('123456');
    
            // Verify that the result is false
            expect(result).toBe(false);
        });
    
        it('should throw an error when bookRepository.delete rejects with an error', async () => {
            // Define expected error
            const expectedError = new Error('Failed to delete book');
    
            // Mock bookRepository.delete to reject with an error
            mockBookRepository.delete.mockRejectedValue(expectedError);
    
            // Call deleteBook method and expect it to throw an error
            await expect(bookController.deleteBook('123456')).rejects.toThrow(expectedError);
        });
    });            
});


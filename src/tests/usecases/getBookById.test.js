const GetBookById = require('core/usecases/getBookById'); // Import the GetBookById class
const Book = require('core/entities/book'); // Import the Book class or mock it if needed

// Mock the bookRepository object
const mockBookRepository = {
    getById: jest.fn() // Mock the getById method
};

// Create a new instance of the GetBookById class with the mock bookRepository
const getBookById = new GetBookById(mockBookRepository);

describe('GetBookById', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock function calls after each test
    });

    it('should call bookRepository.getById with the correct book ID', async () => {
        // Define test data
        const bookId = 'book123';

        // Call the execute method with the test data
        await getBookById.execute(bookId);

        // Verify that bookRepository.getById was called with the correct book ID
        expect(mockBookRepository.getById).toHaveBeenCalledWith(bookId);
    });

    it('should return the book when bookRepository.getById resolves successfully', async () => {
        // Define test data
        const bookId = 'book123';
        const book = new Book('Test Book', 'Test Author', 9.99, '1234567890', 'English', 200, 'Test Publisher');

        // Mock bookRepository.getById to resolve with the test data
        mockBookRepository.getById.mockResolvedValue(book);

        // Call the execute method with the test data
        const result = await getBookById.execute(bookId);

        // Verify that the result is the expected book
        expect(result).toEqual(book);
    });

    it('should return null when bookRepository.getById resolves with null', async () => {
        // Define test data
        const bookId = 'book123';

        // Mock bookRepository.getById to resolve with null
        mockBookRepository.getById.mockResolvedValue(null);

        // Call the execute method with the test data
        const result = await getBookById.execute(bookId);

        // Verify that the result is null
        expect(result).toBeNull();
    });

    it('should throw an error when bookRepository.getById rejects with an error', async () => {
        // Define test data
        const bookId = 'book123';
        const expectedError = new Error('Failed to retrieve book'); // Expected error object

        // Mock bookRepository.getById to reject with an error
        mockBookRepository.getById.mockRejectedValue(expectedError);

        // Call the execute method with the test data and expect it to throw an error
        await expect(getBookById.execute(bookId)).rejects.toThrow(expectedError);
    });
});

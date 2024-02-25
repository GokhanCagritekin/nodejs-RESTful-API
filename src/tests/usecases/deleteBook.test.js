const DeleteBook = require('core/usecases/deleteBook'); // Import the DeleteBook class
const Book = require('core/entities/book'); // Import the Book class or mock it if needed

// Mock the bookRepository object
const mockBookRepository = {
    delete: jest.fn() // Mock the delete method
};

// Create a new instance of the DeleteBook class with the mock bookRepository
const deleteBook = new DeleteBook(mockBookRepository);

describe('DeleteBook', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock function calls after each test
    });

    it('should call bookRepository.delete with the correct book ID', async () => {
        // Define test data
        const bookId = 'test-book-id';

        // Call the execute method with test data
        await deleteBook.execute(bookId);

        // Verify that bookRepository.delete was called with the correct parameters
        expect(mockBookRepository.delete).toHaveBeenCalledWith(bookId);
    });

    it('should return true when bookRepository.delete resolves successfully', async () => {
        // Define test data
        const bookId = 'test-book-id';

        // Mock bookRepository.delete to resolve with true
        mockBookRepository.delete.mockResolvedValue(true);

        // Call the execute method with test data
        const result = await deleteBook.execute(bookId);

        // Verify that the result is true
        expect(result).toBe(true);
    });

    it('should return false when bookRepository.delete resolves with false', async () => {
        // Define test data
        const bookId = 'test-book-id';

        // Mock bookRepository.delete to resolve with false
        mockBookRepository.delete.mockResolvedValue(false);

        // Call the execute method with test data
        const result = await deleteBook.execute(bookId);

        // Verify that the result is false
        expect(result).toBe(false);
    });

    it('should throw an error when bookRepository.delete rejects with an error', async () => {
        // Define test data
        const bookId = 'test-book-id';
        const expectedError = new Error('Failed to delete book'); // Expected error object

        // Mock bookRepository.delete to reject with an error
        mockBookRepository.delete.mockRejectedValue(expectedError);

        // Call the execute method with test data and expect it to throw an error
        await expect(deleteBook.execute(bookId)).rejects.toThrow(expectedError);
    });
});

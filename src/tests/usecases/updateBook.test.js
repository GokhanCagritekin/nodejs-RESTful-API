const UpdateBook = require('core/usecases/updateBook'); // Import the UpdateBook class
const Book = require('core/entities/book'); // Import the Book class or mock it if needed

// Mock the bookRepository object
const mockBookRepository = {
    update: jest.fn() // Mock the update method
};

// Create a new instance of the UpdateBook class with the mock bookRepository
const updateBook = new UpdateBook(mockBookRepository);

describe('UpdateBook', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock function calls after each test
    });

    it('should call bookRepository.update with the correct parameters', async () => {
        // Define test data
        const bookId = 'book123';
        const updatedFields = { title: 'Updated Title', author: 'Updated Author' };

        // Call the execute method with the test data
        await updateBook.execute(bookId, updatedFields);

        // Verify that bookRepository.update was called with the correct parameters
        expect(mockBookRepository.update).toHaveBeenCalledWith(bookId, updatedFields);
    });

    it('should return true when bookRepository.update resolves successfully', async () => {
        // Define test data
        const bookId = 'book123';
        const updatedFields = { title: 'Updated Title', author: 'Updated Author' };

        // Mock bookRepository.update to resolve with true
        mockBookRepository.update.mockResolvedValue(true);

        // Call the execute method with the test data
        const result = await updateBook.execute(bookId, updatedFields);

        // Verify that the result is true
        expect(result).toBe(true);
    });

    it('should return false when bookRepository.update resolves with false', async () => {
        // Define test data
        const bookId = 'book123';
        const updatedFields = { title: 'Updated Title', author: 'Updated Author' };

        // Mock bookRepository.update to resolve with false
        mockBookRepository.update.mockResolvedValue(false);

        // Call the execute method with the test data
        const result = await updateBook.execute(bookId, updatedFields);

        // Verify that the result is false
        expect(result).toBe(false);
    });

    it('should throw an error when bookRepository.update rejects with an error', async () => {
        // Define test data
        const bookId = 'book123';
        const updatedFields = { title: 'Updated Title', author: 'Updated Author' };
        const expectedError = new Error('Failed to update book'); // Expected error object

        // Mock bookRepository.update to reject with an error
        mockBookRepository.update.mockRejectedValue(expectedError);

        // Call the execute method with the test data and expect it to throw an error
        await expect(updateBook.execute(bookId, updatedFields)).rejects.toThrow(expectedError);
    });
});

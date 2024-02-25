const GetAllBooks = require('core/usecases/getAllBooks'); // Import the GetAllBooks class
const Book = require('core/entities/book'); // Import the Book class or mock it if needed

// Mock the bookRepository object
const mockBookRepository = {
    getAll: jest.fn() // Mock the getAll method
};

// Create a new instance of the GetAllBooks class with the mock bookRepository
const getAllBooks = new GetAllBooks(mockBookRepository);

describe('GetAllBooks', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock function calls after each test
    });

    it('should call bookRepository.getAll', async () => {
        // Call the execute method
        await getAllBooks.execute();

        // Verify that bookRepository.getAll was called
        expect(mockBookRepository.getAll).toHaveBeenCalled();
    });

    it('should return an array of books when bookRepository.getAll resolves successfully', async () => {
        // Define test data
        const books = [
            new Book('Book 1', 'Author 1', 10.99, '1234567890', 'English', 200, 'Publisher 1'),
            new Book('Book 2', 'Author 2', 15.99, '0987654321', 'French', 300, 'Publisher 2')
        ];

        // Mock bookRepository.getAll to resolve with the test data
        mockBookRepository.getAll.mockResolvedValue(books);

        // Call the execute method
        const result = await getAllBooks.execute();

        // Verify that the result is an array of books
        expect(result).toEqual(books);
    });

    it('should throw an error when bookRepository.getAll rejects with an error', async () => {
        // Define test data
        const expectedError = new Error('Failed to retrieve books'); // Expected error object

        // Mock bookRepository.getAll to reject with an error
        mockBookRepository.getAll.mockRejectedValue(expectedError);

        // Call the execute method and expect it to throw an error
        await expect(getAllBooks.execute()).rejects.toThrow(expectedError);
    });
});

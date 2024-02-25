const CreateBook = require('core/usecases/createBook'); // Import the CreateBook class
const Book = require('core/entities/book'); // Import the Book class or mock it if needed

// Mock the bookRepository object
const mockBookRepository = {
    create: jest.fn() // Mock the create method
};

// Create a new instance of the CreateBook class with the mock bookRepository
const createBook = new CreateBook(mockBookRepository);

describe('CreateBook', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock function calls after each test
    });

    it('should call bookRepository.create with the correct parameters', async () => {
        // Define test data
        const title = 'Test Book';
        const author = 'Test Author';
        const price = 9.99;
        const isbn = '1234567890';
        const language = 'English';
        const numPages = 200;
        const publisher = 'Test Publisher';

        // Call the execute method with test data
        await createBook.execute(title, author, price, isbn, language, numPages, publisher);        

        // Verify that bookRepository.create was called with the correct parameters
        expect(mockBookRepository.create).toHaveBeenCalledWith(expect.any(Book));
        expect(mockBookRepository.create).toHaveBeenCalledWith(new Book(title, author, price, isbn, language, numPages, publisher));
    });

    it('should return the book ID when bookRepository.create resolves successfully', async () => {
        // Define test data
        const title = 'Test Book';
        const author = 'Test Author';
        const price = 9.99;
        const isbn = '1234567890';
        const language = 'English';
        const numPages = 200;
        const publisher = 'Test Publisher';
        const expectedBookId = 'book123'; // Expected book ID when create succeeds

        // Mock bookRepository.create to resolve with the expected book ID
        mockBookRepository.create.mockResolvedValue(expectedBookId);

        // Call the execute method with test data
        const result = await createBook.execute(title, author, price, isbn, language, numPages, publisher);

        // Verify that the result is the expected book ID
        expect(result).toBe(expectedBookId);
    });

    it('should throw an error when bookRepository.create rejects with an error', async () => {
        // Define test data
        const title = 'Test Book';
        const author = 'Test Author';
        const price = 9.99;
        const isbn = '1234567890';
        const language = 'English';
        const numPages = 200;
        const publisher = 'Test Publisher';
        const expectedError = new Error('Failed to create book'); // Expected error object

        // Mock bookRepository.create to reject with an error
        mockBookRepository.create.mockRejectedValue(expectedError);

        // Call the execute method with test data and expect it to throw an error
        await expect(createBook.execute(title, author, price, isbn, language, numPages, publisher)).rejects.toThrow(expectedError);
    });
});

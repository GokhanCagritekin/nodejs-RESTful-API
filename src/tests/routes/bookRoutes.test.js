const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');

// Import the BookController class or mock it if needed
const BookController = require('controllers/bookController');

// Mock the BookController object
const mockBookController = {
    createBook: jest.fn(),
    getAllBooks: jest.fn(),
    getBookById: jest.fn(),
    updateBook: jest.fn(),
    deleteBook: jest.fn(),
};

// Import the routes module
const bookRoutes = require('frameworks/express/routes/bookRoutes');

// Create an Express application
const app = express();

// Add bodyParser middleware
app.use(bodyParser.json());

// Mount book routes with mocked BookController
app.use('/', bookRoutes(mockBookController));

describe('Book Routes', () => {
    beforeEach(() => {
        // Clear all mock calls before each test
        jest.clearAllMocks();
    });

    describe('POST /books', () => {
        it('should call createBook method of BookController with correct parameters', async () => {
            const testData = {
                title: 'Test Book',
                author: 'Test Author',
                price: 9.99,
                isbn: '1234567890',
                language: 'English',
                numPages: 200,
                publisher: 'Test Publisher',
            };

            await request(app)
                .post('/books')
                .send(testData);

            expect(mockBookController.createBook).toHaveBeenCalledWith(
                testData.title,
                testData.author,
                testData.price,
                testData.isbn,
                testData.language,
                testData.numPages,
                testData.publisher
            );
        });

        it('should respond with status 201 and book ID when createBook resolves successfully', async () => {
            const testData = {
                title: 'Test Book',
                author: 'Test Author',
                price: 9.99,
                isbn: '1234567890',
                language: 'English',
                numPages: 200,
                publisher: 'Test Publisher',
            };

            const expectedBookId = 'book123';

            mockBookController.createBook.mockResolvedValueOnce(expectedBookId);

            const response = await request(app)
                .post('/books')
                .send(testData);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                message: 'Book created successfully',
                bookId: expectedBookId
            });
        });

        it('should respond with status 500 when createBook rejects with an error', async () => {
            const testData = {
                title: 'Test Book',
                author: 'Test Author',
                price: 9.99,
                isbn: '1234567890',
                language: 'English',
                numPages: 200,
                publisher: 'Test Publisher',
            };

            const expectedError = new Error('Failed to create book');

            mockBookController.createBook.mockRejectedValueOnce(expectedError);

            const response = await request(app)
                .post('/books')
                .send(testData);

            expect(response.status).toBe(500);
        });
    }); 
    
    describe('GET /books', () => {
        it('should call getAllBooks method of BookController', async () => {
            await request(app).get('/books');
    
            expect(mockBookController.getAllBooks).toHaveBeenCalled();
        });
    
        it('should return status 200 and an array of books if BookController returns books', async () => {
            // Mock data returned by getAllBooks method
            const mockBooks = [
                { id: '1', title: 'Book 1', author: 'Author 1', price: 10 },
                { id: '2', title: 'Book 2', author: 'Author 2', price: 15 },
            ];
    
            // Mock the implementation of getAllBooks to return mockBooks
            mockBookController.getAllBooks.mockResolvedValueOnce(mockBooks);
    
            // Send GET request to /books
            const response = await request(app).get('/books');
    
            // Expect status to be 200
            expect(response.status).toBe(200);
    
            // Expect response body to be an array of books
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toEqual(mockBooks);
        });
    
        it('should return status 500 if BookController throws an error', async () => {
            // Mock error thrown by getAllBooks method
            const mockError = new Error('Internal server error');
    
            // Mock the implementation of getAllBooks to throw an error
            mockBookController.getAllBooks.mockRejectedValueOnce(mockError);
    
            // Send GET request to /books
            const response = await request(app).get('/books');
    
            // Expect status to be 500
            expect(response.status).toBe(500);
        });   
    });
    
    describe('GET /books/:id', () => {
        it('should call getBookById method of BookController with correct bookId', async () => {
            const bookId = '123';
    
            await request(app).get(`/books/${bookId}`);
    
            expect(mockBookController.getBookById).toHaveBeenCalledWith(bookId);
        });
    
        it('should return status 200 and the book if BookController returns the book', async () => {
            const bookId = '123';
            const mockBook = { id: bookId, title: 'Test Book', author: 'Test Author', price: 9.99 };
    
            // Mock the implementation of getBookById to return mockBook
            mockBookController.getBookById.mockResolvedValueOnce(mockBook);
    
            // Send GET request to /books/:id
            const response = await request(app).get(`/books/${bookId}`);
    
            // Expect status to be 200
            expect(response.status).toBe(200);
    
            // Expect response body to be the book
            expect(response.body).toEqual(mockBook);
        });
    
        it('should return status 404 if BookController returns null', async () => {
            const bookId = '123';
    
            // Mock the implementation of getBookById to return null
            mockBookController.getBookById.mockResolvedValueOnce(null);
    
            // Send GET request to /books/:id
            const response = await request(app).get(`/books/${bookId}`);
    
            // Expect status to be 404
            expect(response.status).toBe(404);
        });
    
        it('should return status 500 if BookController throws an error', async () => {
            const bookId = '123';
            // Mock error thrown by getBookById method
            const mockError = new Error('Internal server error');
    
            // Mock the implementation of getBookById to throw an error
            mockBookController.getBookById.mockRejectedValueOnce(mockError);
    
            // Send GET request to /books/:id
            const response = await request(app).get(`/books/${bookId}`);
    
            // Expect status to be 500
            expect(response.status).toBe(500);
        });            
    });

    describe('PUT /books/:id', () => {
        it('should call updateBook method of BookController with correct parameters', async () => {
            const bookId = '123';
            const testData = {
                title: 'Updated Title',
                author: 'Updated Author',
                price: 15.99,
                isbn: '9876543210',
                language: 'French',
                numPages: 250,
                publisher: 'Updated Publisher',
            };
    
            await request(app)
                .put(`/books/${bookId}`)
                .send(testData);
    
            expect(mockBookController.updateBook).toHaveBeenCalledWith(bookId, testData);
        });
    
        it('should return status 200 and a success message if updateBook is successful', async () => {
            const bookId = '123';
            const testData = {
                title: 'Updated Title',
                author: 'Updated Author',
                price: 15.99,
                isbn: '9876543210',
                language: 'French',
                numPages: 250,
                publisher: 'Updated Publisher',
            };
    
            // Mock the implementation of updateBook to return true (success)
            mockBookController.updateBook.mockResolvedValueOnce(true);
    
            // Send PUT request to /books/:id
            const response = await request(app)
                .put(`/books/${bookId}`)
                .send(testData);
    
            // Expect status to be 200
            expect(response.status).toBe(200);
    
            // Expect response body to contain success message
            expect(response.body).toEqual({ message: 'Book updated successfully' });
        });
    
        it('should return status 404 if updateBook returns false (book not found)', async () => {
            const bookId = '123';
            const testData = {
                title: 'Updated Title',
                author: 'Updated Author',
                price: 15.99,
                isbn: '9876543210',
                language: 'French',
                numPages: 250,
                publisher: 'Updated Publisher',
            };
    
            // Mock the implementation of updateBook to return false (book not found)
            mockBookController.updateBook.mockResolvedValueOnce(false);
    
            // Send PUT request to /books/:id
            const response = await request(app)
                .put(`/books/${bookId}`)
                .send(testData);
    
            // Expect status to be 404
            expect(response.status).toBe(404);
        });
    
        it('should return status 500 if updateBook throws an error', async () => {
            const bookId = '123';
            const testData = {
                title: 'Updated Title',
                author: 'Updated Author',
                price: 15.99,
                isbn: '9876543210',
                language: 'French',
                numPages: 250,
                publisher: 'Updated Publisher',
            };
    
            // Mock error thrown by updateBook method
            const mockError = new Error('Internal server error');
    
            // Mock the implementation of updateBook to throw an error
            mockBookController.updateBook.mockRejectedValueOnce(mockError);
    
            // Send PUT request to /books/:id
            const response = await request(app)
                .put(`/books/${bookId}`)
                .send(testData);
    
            // Expect status to be 500
            expect(response.status).toBe(500);
        });            
    });
    
    describe('DELETE /books/:id', () => {
        it('should call deleteBook method of BookController with correct bookId', async () => {
            const bookId = '123';
    
            await request(app)
                .delete(`/books/${bookId}`);
    
            expect(mockBookController.deleteBook).toHaveBeenCalledWith(bookId);
        });
    
        it('should return status 200 and a success message if deleteBook is successful', async () => {
            const bookId = '123';
    
            // Mock the implementation of deleteBook to return true (success)
            mockBookController.deleteBook.mockResolvedValueOnce(true);
    
            // Send DELETE request to /books/:id
            const response = await request(app)
                .delete(`/books/${bookId}`);
    
            // Expect status to be 200
            expect(response.status).toBe(200);
    
            // Expect response body to contain success message
            expect(response.body).toEqual({ message: 'Book deleted successfully' });
        });
    
        it('should return status 404 if deleteBook returns false (book not found)', async () => {
            const bookId = '123';
    
            // Mock the implementation of deleteBook to return false (book not found)
            mockBookController.deleteBook.mockResolvedValueOnce(false);
    
            // Send DELETE request to /books/:id
            const response = await request(app)
                .delete(`/books/${bookId}`);

            // Expect status to be 404
            expect(response.status).toBe(404);
        });
    
        it('should return status 500 if deleteBook throws an error', async () => {
            const bookId = '123';
    
            // Mock error thrown by deleteBook method
            const mockError = new Error('Internal server error');
    
            // Mock the implementation of deleteBook to throw an error
            mockBookController.deleteBook.mockRejectedValueOnce(mockError);
    
            // Send DELETE request to /books/:id
            const response = await request(app)
                .delete(`/books/${bookId}`);
    
            // Expect status to be 500
            expect(response.status).toBe(500);
        });            
    });    
});

# Book API

This is a RESTful API for managing books. It allows users to perform CRUD operations on book resources.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/GokhanCagritekin/nodejs-restful-api.git
   ```

2. Install dependencies:
   ```   
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and define the following variables:
   ```
   DB_URI=mongodb://mongodb-myapp:27017/myappdb?directConnection=true
   PORT=3000
   ```

4. Start the containers:
   ```
   docker-compose up --build
   ```

The server will start running on http://localhost:3000 by default.

## API Endpoints

### Creating a Book

- URL: `POST /books`
- Request Body:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "price": 19.99,
    "ISBN": "978-1-56619-909-4",
    "language": "English",
    "numberOfPages": 300,
    "publisher": "Publisher Name"
  }
  ```
- Response:
  - Status: 200 OK
  - Body: The created book object

### Getting All Books

- URL: `GET /books`
- Response:
  - Status: 200 OK
  - Body: An array of all books

### Getting a Book by ID

- URL: `GET /books/:id`
- Response:
  - Status: 200 OK
  - Body: The book object with the specified ID
  - Status: 404 Not Found if the book with the specified ID does not exist

### Updating a Book

- URL: `PUT /books/:id`
- Request Body: 
  ```json
  {
    "title": "Updated Book Title",
    "author": "Updated Author Name",
    ...
  }
  ```
- Response:
  - Status: 200 OK
  - Body: The updated book object
  - Status: 404 Not Found if the book with the specified ID does not exist

### Deleting a Book

- URL: `DELETE /books/:id`
- Response:
  - Status: 200 OK
  - Status: 404 Not Found if the book with the specified ID does not exist
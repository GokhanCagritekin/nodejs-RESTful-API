const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./frameworks/express/routes/bookRoutes');
const BookController = require('./controllers/bookController');
const MongoDBBookRepository = require('./core/repositories/mongodb/mongodbBookRepository');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();

// Use body-parser middleware to parse request bodies as JSON
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI, {    
  })
  .then(() => {
    console.log('Connected to MongoDB');
  
    // Initialize BookController with MongoDBBookRepository
    const db = mongoose.connection;
    const bookRepository = new MongoDBBookRepository(db);
    const bookController = new BookController(bookRepository);
  
    // Mount book routes
    app.use('/', bookRoutes(bookController));
  
    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = app;

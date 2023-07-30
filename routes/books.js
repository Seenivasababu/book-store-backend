const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new book
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// More endpoints (e.g., get single book by ID, update book, delete book) can be added here
// Search books by keywords
router.get('/search', async (req, res) => {
  const { keywords } = req.query;
  const query = {};

  if (keywords) {
    query.$or = [
      { title: { $regex: keywords, $options: 'i' } },
      { author: { $regex: keywords, $options: 'i' } },
      { description: { $regex: keywords, $options: 'i' } },
    ];
  }

  try {
    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Filter books by category
router.get('/filter', async (req, res) => {
  const { category } = req.query;
  const query = {};

  if (category) {
    query.category = category;
  }

  try {
    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Sort books by price
router.get('/sort', async (req, res) => {
  const { sortByPrice } = req.query;

  try {
    let books;

    if (sortByPrice === 'asc') {
      books = await Book.find().sort({ price: 1 });
    } else if (sortByPrice === 'desc') {
      books = await Book.find().sort({ price: -1 });
    } else {
      books = await Book.find();
    }

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); 


module.exports = router;

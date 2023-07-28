const express = require('express');
const router = express.Router();
const ShoppingCart = require('../models/shoppingCart');

// Get all shopping carts
router.get('/', async (req, res) => {
  try {
    const shoppingCarts = await ShoppingCart.find();
    res.json(shoppingCarts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all shopping cart items by CustomerId
router.get('/customer/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const shoppingCarts = await ShoppingCart.find({ customerId });

    if (shoppingCarts.length === 0) {
      return res.status(404).json({ message: 'Shopping cart items not found for the given CustomerId' });
    }

    res.json(shoppingCarts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new shopping cart item
router.post('/', async (req, res) => {
  const shoppingCart = new ShoppingCart({
    customerId: req.body.customerId,
    bookId: req.body.bookId,
  });

  try {
    const newCartItem = await shoppingCart.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// More endpoints (e.g., get shopping cart items by customer ID, delete a shopping cart item) can be added here

module.exports = router;

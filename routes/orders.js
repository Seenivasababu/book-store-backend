const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Customer = require('../models/customer');
const Book = require('../models/book');
// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single order by ID with relevant customer and book details
router.get('/:id', async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      const customerId = order.customerId;
      const bookId = order.bookId;
  
      const [customer, book] = await Promise.all([
        Customer.findById(customerId),
        Book.findById(bookId)
      ]);
  
      if (!customer || !book) {
        return res.status(404).json({ message: 'Customer or Book not found' });
      }
  
      // Combine the order, customer, and book details into a single response object
      const orderDetails = {
        _id: order._id,
        orderDate: order.orderDate,
        book: book,
        customer: customer
      };
  
      res.json(orderDetails);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



// Create a new order
router.post('/', async (req, res) => {
  const order = new Order({
    orderDate: req.body.orderDate,
    bookId: req.body.bookId,
    customerId: req.body.customerId,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// More endpoints (e.g., get single order by ID, update order, delete order) can be added here

module.exports = router;

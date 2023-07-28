const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderDate: { type: Date, default: Date.now, required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

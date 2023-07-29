const express = require('express');
require('dotenv').config();
const app = express();
const user = require('./routes/user')

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const booksRouter = require('./routes/books');
const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders');
const shoppingCartsRouter = require('./routes/shoppingCarts');

app.use(express.json());
app.use('/user', user)
app.use('/books', booksRouter);
app.use('/customers', customersRouter);
app.use('/orders', ordersRouter);
app.use('/shoppingCarts', shoppingCartsRouter);

// Other app configurations and error handling can be added here

app.listen(3000, () => console.log('Server started on port 3000'));

const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
});

module.exports = mongoose.model('OrderItem', orderItemSchema);

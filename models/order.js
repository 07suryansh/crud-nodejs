const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
  totalAmount: Number,
});

module.exports = mongoose.model('Order', orderSchema);

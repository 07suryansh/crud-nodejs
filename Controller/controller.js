const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const Payment = require("../models/payment");
const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({
      name: name,
      email: email,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId, item } = req.body;
    const orderItems = await OrderItem.create(item);
    console.log(orderItems);
    console.log(typeof orderItems);
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const order = await Order.create({
      user: userId,
      items: orderItems.map((item) => item._id),
      totalAmount,
    });
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId, items } = req.body;
    const orderItems = await OrderItem.create(items);
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const order = await Order.findByIdAndUpdate(
      orderId,
      { user: userId, items: orderItems.map((item) => item._id), totalAmount },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const paymentOrder = async (req, res) => {
  try {
    const { userId, orderId, amount } = req.body;
    const payment = await Payment.create({
      user: userId,
      order: orderId,
      amount,
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find({});
    res.status(200).json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, createOrder, updateOrder, paymentOrder, getUsers, getOrders,
getOrderItems, getPayments};

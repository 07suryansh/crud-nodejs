const express = require("express");
const router = express.Router();
const {
  createUser,
  createOrder,
  updateOrder,
  paymentOrder,
  getUsers,
  getOrders,
  getOrderItems,
  getPayments,
} = require("../Controller/controller");

router.post("/createUser", createUser);
router.post("/createOrder", createOrder);
router.put("/updateOrder/:orderId", updateOrder);
router.post("/paymentOrder", paymentOrder);
router.get("/users", getUsers);
router.get("/orders", getOrders);
router.get("/orderItems", getOrderItems);
router.get("/payments", getPayments);

module.exports = router;

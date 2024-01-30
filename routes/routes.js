const express = require("express");
const router = express.Router();
const {createUser,createOrder,updateOrder,paymentOrder}=require('../Controller/controller')

router.post("/createUser", createUser);
router.post("/createOrder", createOrder);
router.put("/updateOrder/:orderId", updateOrder);
router.post("/paymentOrder", paymentOrder);

module.exports = router;

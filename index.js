// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/user");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");
const Payment = require("./models/payment");
const router = require("./routes/routes");

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    const orders = await Order.find({});
    const orderItems = await OrderItem.find({});
    const payments = await Payment.find({});
    // res.status(200).json(users);
    // res.status(200).json(orders);
    // res.status(200).json(orderItems);
    // res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

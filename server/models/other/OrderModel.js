const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  delivery_address: {
    type: Object,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  coupon: {
    type: String,
    default: "", // Optional, defaults to empty string
  },
  items: {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Item model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    pic: {
      type: String,
      default: 0,
    },
  },
  price: {
    grandPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
  },
  order_id: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate order IDs
  },
  time: {
    type: Date,
    default: Date.now,
  },
  total_quantity: {
    type: Number,
    required: true,
  },
  order_status: {
    type: String,
    enum: ["Pending","Processed", "Shipped" , "Delivered", "cancelled"], // Possible statuses
    default: "Processed",
  },
  payment_status: {
    type: String,
    enum: ["pending", "paid", "failed"], // Possible payment statuses
    default: "pending",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

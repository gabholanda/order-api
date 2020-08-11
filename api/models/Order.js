const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  amount: {
    type: Number,
    get: (v) => v.toFixed(2),
    set: (v) => v.toFixed(2),
    default: 0,
    required: true,
  },
  phoneNumber: { type: String, max: 11, required: true },
  createdDate: { type: Date, required: true },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

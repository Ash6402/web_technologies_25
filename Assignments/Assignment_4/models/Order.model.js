const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  items: [
    {
      id: {
        // type: Schema.Types.ObjectId,
        type: String,
        // ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  orderedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);

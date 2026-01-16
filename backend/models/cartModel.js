const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    // 1. Link to the User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // 2. The Array of Items
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sneaker",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
        size: {
          type: Number,
          required: true,
        },
        // Optional: Cache the price here in case the product price changes later
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    // 3. Total Price (Auto-calculated later)
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);

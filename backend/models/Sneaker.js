const mongoose = require("mongoose");

const sneakerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Men", "Women"],
  },

  sizes: [
    {
      size: { type: Number, required: true },
      stock: { type: Number, default: 0 },
    },
  ],

  // The first image uploaded acts as the "Cover Photo"
  mainImage: {
    type: String,
    required: true,
  },
  // We store ALL uploaded images here (including the main one)
  images: [String],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sneaker", sneakerSchema);

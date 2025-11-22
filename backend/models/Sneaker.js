const mongoose = require("mongoose");

const sneakerSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [/.+@.+\..+/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
});

const sneakerModel = mongoose.model("register", sneakerSchema);
module.exports = sneakerModel;

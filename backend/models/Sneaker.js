const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

sneakerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

const sneakerModel = mongoose.model("register", sneakerSchema);
module.exports = sneakerModel;

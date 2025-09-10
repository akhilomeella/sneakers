const mongoose = require("mongoose");

const sneakerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const sneakerModel = mongoose.model("register", sneakerSchema);
module.exports = sneakerModel;

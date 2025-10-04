const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sneakerModel = require("./models/Sneaker");
const dotenv = require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  sneakerModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password && user.email === email) {
        res.json("Success");
      } else {
        res.json("Incorrect password or username");
      }
    } else {
      res.json("Record does not exist");
    }
  });
});

app.post("/signup", (req, res) => {
  sneakerModel
    .create(req.body)
    .then((register) => res.json(register))
    .catch((err) => res.json(err));
});

app.listen(3000, "0.0.0.0", () => {
  console.log("servr is running");
});

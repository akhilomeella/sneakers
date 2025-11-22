const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sneakerModel = require("./models/Sneaker");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");

const app = express();
app.use(
  cors({
    origin: ["https://ell-sneakers.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await sneakerModel.findOne({ email });
    if (!user) {
      return res.json("Record does not exist");
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json("Incorrect password or username");
    }

    res.json("Success");
  } catch (err) {
    res.json(err);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExist = await sneakerModel.findOne({ email });
    if (userExist) {
      return res.json("User already exists");
    }

    // Hash password manually
    const salt = await bcrypt.genSalt();
    const hash_password = await bcrypt.hash(password, salt);

    // Create user
    const user = await sneakerModel.create({
      name,
      email,
      password: hash_password,
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`servr is running on port ${PORT}`);
});

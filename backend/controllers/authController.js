const userModel = require("../models/Sneaker");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json("User already exists");
    }

    // Hash password
    const hash_password = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
      name,
      email,
      password: hash_password,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json("Record does not exist");
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json("Incorrect password or username");
    }

    const payload = { id: user._id, email: user.email };

    //Create access token
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    //Create refresh token
    const refreshToken = jwt.sign(payload.id, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    //HTTP-only cookies for secure storage of refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

const refresh = async (req, res) => {};

module.exports = { signup, login };

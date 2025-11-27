const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes/authRoute");

connectDB();

const app = express();
app.use(
  cors({
    origin: ["https://ell-sneakers.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/auth", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`servr is running on port ${PORT}`);
});

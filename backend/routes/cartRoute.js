const router = require("express").Router();
const { addToCart, getCart } = require("../controllers/cartController");

router.get("/cart", getCart);
router.post("/cart", addToCart);

module.exports = router;

const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// GET CART
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD TO CART
const addToCart = async (req, res) => {
  const { productId, quantity, size } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    // If no cart exists for this user, create one
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if product + size already exists in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (itemIndex > -1) {
      // Item exists? Just increase quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // New item? Push to array
      // We also fetch the price to save it (optional but recommended)
      const product = await Product.findById(productId);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      cart.items.push({
        product: productId,
        quantity,
        size,
        price: product.price,
      });
    }

    await cart.save();

    // Return the updated cart (with product details populated)
    const updatedCart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    res.json(updatedCart.items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not add to cart" });
  }
};

module.exports = { getCart, addToCart };

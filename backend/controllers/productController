const Sneaker = require("../models/Sneaker");

const createSneaker = async (req, res) => {
  try {
    const { name, brand, price, description, sizes, category } = req.body;

    // Validate Files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Get Cloudinary URLs
    const imageUrls = req.files.map((file) => file.path);

    // 4. Create the Sneaker
    const newSneaker = await Sneaker.create({
      name,
      brand,
      category,
      price,
      description,
      sizes: JSON.parse(sizes), // Remember: FormData sends this as a string!
      mainImage: imageUrls[0],
      images: imageUrls,
    });

    res.status(201).json(newSneaker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSneakers = async (req, res) => {
  try {
    // Grab the parameters from the URL
    // Example URL: /sneakers?category=Men&brand=Nike
    const { category, brand } = req.query;

    // Build the "Filter Object" dynamically
    const queryObj = {};

    // If the user sent ?category=Men, add it to the filter
    if (category) {
      queryObj.category = category;
    }

    // If the user sent ?brand=Nike, add it to the filter
    if (brand) {
      queryObj.brand = brand;
    }

    // Search the Database using the filter
    // If queryObj is empty {}, it returns ALL sneakers.
    // If queryObj is { category: "Men" }, it returns only Men's sneakers.
    const sneakers = await Sneaker.find(queryObj);

    res.status(200).json(sneakers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSneaker, getSneakers };

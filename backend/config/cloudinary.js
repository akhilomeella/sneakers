const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//Configure storage settings
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sneaker-store", // The folder name in your Cloudinary Dashboard
    allowed_formats: ["jpg", "png", "jpeg", "webp", "avif"], // Restrict file types
  },
});

// Create the upload instance
const upload = multer({ storage });

module.exports = upload;

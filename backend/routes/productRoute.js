const router = require("express").Router();
const {
  createSneaker,
  getSneakers,
} = require("../controllers/productController");
const upload = require("../config/cloudinary");

// "photos" is the key name you MUST use in your Frontend Form
// 5 is the maximum number of images allowed
router.post("/", upload.array("photos", 5), createSneaker);

router.get("/sneakers", getSneakers);

module.exports = router;

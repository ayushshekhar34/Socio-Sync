const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const { fileUpload, getAllMedia } = require("../controllers/MediaUpload");

router.post("/fileUpload", fileUpload);
router.get("/getMedia", getAllMedia);
module.exports = router;

const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const { searchbar } = require("../controllers/SearchBar");

router.get("/searchquery", searchbar);

module.exports = router;

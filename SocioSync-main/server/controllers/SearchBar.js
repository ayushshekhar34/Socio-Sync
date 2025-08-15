const User = require("../models/User");
const mongoose = require("mongoose");

require("dotenv").config();

exports.searchbar = async (req, res) => {
  try {
    const { query } = req.query;
    // console.log(req.query);
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { userName: { $regex: query, $options: "i" } },
      ],
    }).limit(10);
    return res.status(200).json({
      success: true,
      message: "users found",
      users: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Error in searching`,
      error: error.message,
    });
  }
};

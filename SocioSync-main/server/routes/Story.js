const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostByUser,
  likePost,
  viewPost,
} = require("../controllers/Story");

router.post("/create", createPost);
router.get("/all", getAllPosts);
router.get("/user", getPostByUser);
router.put("/like", likePost);
router.put("/view", viewPost);

module.exports = router;

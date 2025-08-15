const Story = require("../models/Story");
const { uploadFileToCloudinary } = require("../utils/fileUploader");

exports.createPost = async (req, res) => {
  try {
    const { user, content, description, userPic } = req.body;

    const file = req.files.file;

    console.log("File", file);
    console.log("data", user, content, description, userPic);
    const caption = description ? description : "No description provided";

    const response = await uploadFileToCloudinary(
      file,
      process.env.FOLDER_NAME
    );
    const FileUrl = response.secure_url;
    const created_at = new Date();
    // Create a new story object
    const newStory = new Story({
      user,
      userPic,
      created_at,
      content,
      FileUrl,
      description: caption,
    });

    // Save the story to the database
    const savedStory = await newStory.save();

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: savedStory,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Story.find().sort({ created_at: -1 });

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts: allPosts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.getPostByUser = async (req, res) => {
  try {
    const { user } = req.params;

    const posts = await Story.find({ user: user });

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const post = await Story.findById(postId);

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
    } else {
      post.likes.pop(userId);
    }

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post liked successfully",
      post: post,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to like post" });
  }
};

exports.viewPost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    console.log("postID & userID", postId, userId);

    const post = await Story.findById(postId);

    if (!post.views.includes(userId)) {
      post.views.push(userId);

      await post.save();
    }

    return res.status(200).json({
      success: true,
      message: "Post viewed successfully",
      post: post,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to view post" });
  }
};

// The function to share a post is implemented in the SocketController.js file

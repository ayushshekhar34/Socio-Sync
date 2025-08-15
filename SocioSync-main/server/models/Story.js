const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  user: {
    type: String,
  },
  userPic: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  content: {
    type: String,
    enum: ["Text", "Photo", "Video", "Links"],
    default: "Text",
  },
  FileUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  views: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  // comments:[{
  //     user:{
  //         type:mongoose.Schema.Types.ObjectId,
  //         ref:"User",
  //     },
  //     message:{
  //         type:String,
  //     },
  //     created_at:{
  //         type:Date,
  //         default:Date.now(),
  //     },
  // }],
});

module.exports = mongoose.model("Story", storySchema);

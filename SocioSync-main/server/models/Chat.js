const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  sender: {
    type: String,
    // ref:"User",
  },
  receiver: {
    type: String,
    // ref:"User",
  },
  owner: {
    type: String,
  },
  chatType: {
    type: String,
    enum: ["personal", "group"],
    default: "personal",
    // TODO:-Depends on socket
  },
  // status:{
  //     enum:["Pending", "Sent", "Seen"],
  //     // Todo:-Depends on socket
  // },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    default: null,
  },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reaction",
    },
  ],
  time: {
    type: Date,
  },
  MediaType: {
    type: String,
    enum: ["Text", "Photos", "Videos", "Audio", "Post"],
    default: "Text",
  },
  message: {
    type: String,
    // required:true,
  },
  media: {
    type: String,
  },
});

module.exports = mongoose.model("Chat", chatSchema);

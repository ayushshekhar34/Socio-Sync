const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  mediaType: {
    type: String,
    enum: ["Photos", "Videos", "Document", "Audio"],
  },
  sender: {
    type: String,
  },
  receiver: {
    type: String,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  FileUrl: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Media = mongoose.model("Media", fileSchema);
module.exports = Media;

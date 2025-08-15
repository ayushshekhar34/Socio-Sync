const Media = require("../models/Media");
const { uploadFileToCloudinary } = require("../utils/fileUploader");

exports.fileUpload = async (req, res) => {
  try {
    // data fetch
    const { sender, receiver, mediaType, time } = req.body;
    // console.log(req.body);

    const file = req.files.file;
    // console.log(file);

    // validation
    let supportedTypes = [];

    if (mediaType === "Photo & Videos")
      supportedTypes = ["jpg", "jpeg", "png", "gif", "mp4", "mov", "mkv"];
    if (mediaType === "Doc") supportedTypes = ["pdf", "xls", "docx"];
    if (mediaType === "Audio") supportedTypes = ["mp3", "m4a"];

    if (file.size > 80 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "File size exceeds the limit (80 MB)",
        size: file.size,
      });
    }
    console.log(sender, receiver, mediaType);

    const response = await uploadFileToCloudinary(
      file,
      process.env.FOLDER_NAME
    );

    console.log(response);

    // save entry in db
    const fileData = await Media.create({
      mediaType: mediaType,
      sender: sender,
      receiver: receiver,
      group: null,
      FileUrl: response.secure_url,
      created_at: time,
    });

    res.json({
      success: true,
      mediaUrl: response.secure_url,
      message: "File Uploaded Successfully",
      data: fileData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong while uploading file",
    });
  }
};

exports.getAllMedia = async (req, res) => {
  try {
    const sender = req.query.query;
    const allMedia = await Media.find({
      $or: [{ sender: sender }, { receiver: sender }],
    });
    // console.log(allUsers);
    return res.json({
      success: true,
      message: "all Media is",
      allMedia: allMedia,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong while getting all files",
    });
  }
};

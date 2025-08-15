const Profile = require("../models/Profile");
const User = require("../models/User");
const {
  isFileTypeSupported,
  uploadFileToCloudinary,
} = require("../utils/fileUploader");
// Method for updating a profile
exports.updateProfile = async (req, res) => {
  // console.log("hello bcknd")
  try {
    console.log("ic data", req.body);
    const {
      name,
      dateOfBirth = "",
      about = "",
      contactNumber,
      gender,
    } = req.body;
    const id = req.user.id;
    // Find the profile by id
    const userDetails = await User.findById(id).populate('profile');
    const profile = await Profile.findById(userDetails.profile);
    // Update the profile fields
    profile.name = name;
    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;

    // Save the updated profile
    // let updatedUserDetails;
    await profile.save();
    userDetails.profile = profile;
    const updatedUserDetails = userDetails;
    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  console.log("getting all users");
  try {
    const allUsers = await User.find()
      .populate("requests")
      .populate("invites")
      .populate("friends")
      .exec();
    // console.log(allUsers);
    return res.json({
      success: true,
      message: "all Users are",
      allUsers: allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  // console.log(req.user.id)
  try {
    const displayPicture = req.files.file;
    console.log("backend pic is ", displayPicture);
    const userId = req.user.id;

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = displayPicture.name.split(".")[1].toLowerCase();
    console.log("File Type:", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    const image = await uploadFileToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      90
    );
    console.log(image);
    const userProfile = await User.findByIdAndUpdate(
      userId,
      { profilePic: image.secure_url },
      { new: true }
    ).populate("profile");
    console.log("userprofile is", userProfile);
    if (!userProfile) {
      throw new Error("User not found");
    }

    // userProfile.profile.profileImage = image.secure_url;
    const updatedProfile = await User.findOneAndUpdate(
      { userName: userProfile.userName },
      { profilePic: image.secure_url },
      { new: true }
    ).populate('profile');
    // await userProfile.profile.save();
    // console.log("users info is", userProfile.profile);
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const BASE_URL = "https://sociosync-backend.onrender.com/api/v1";
// const BASE_URL = "http://localhost:4000/api/v1"
// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  FORGOTPASSWORD_API: BASE_URL + "/auth/forgotpassword",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_ALL_USERS_API: BASE_URL + "/profile/getallusers",
};

// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};
// Profile SETTINGS PAGE API
export const profileSettingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updatedisplaypicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateprofile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/auth/deleteAccount",
};
export const friendsEndpoints = {
  SEND_REQUEST_API: BASE_URL + "/friends/sendrequest",
  ACCEPT_REQUEST_API: BASE_URL + "/friends/acceptrequest",
  DELETE_REQUEST_API: BASE_URL + "/friends/deleterequest",
  REJECT_REQUEST_API: BASE_URL + "/friends/rejectrequest",
};

// CHAT API

export const chatEndpoints = {
  SEARCH_API: BASE_URL + "/search",
  SEND_CHAT_REQUEST_API: BASE_URL + "/chats/updatechat",
  GET_CHAT_HISTORY_API: BASE_URL + "/chats/getChats",
};

// MEDIA HANDLE API

export const mediaEndpoints = {
  UPLOAD_PHOTOS_AND_VIDEOS: BASE_URL + "/media/fileUpload",
  GET_ALL_MEDIA: BASE_URL + "/media/getMedia",
};

export const searchEndpoints = {
  SEARCH_USER_API: BASE_URL + "/search/searchquery",
};

export const storyEndpoints = {
  CREATE_STORY_API: BASE_URL + "/story/create",
  GET_ALL_STORIES_API: BASE_URL + "/story/all",
  GET_STORY_BY_USER_API: BASE_URL + "/story/user",
  LIKE_STORY_API: BASE_URL + "/story/like",
  VIEW_STORY_API: BASE_URL + "/story/view",
};

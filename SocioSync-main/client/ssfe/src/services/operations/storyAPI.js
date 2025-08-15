import { apiConnector } from "../apiconnector";
import { storyEndpoints } from "../apis";
import { setLoading } from "../../redux/Slices/authSlice";
import { setPosts } from "../../redux/Slices/storySlice";

const {
  CREATE_STORY_API,
  GET_ALL_STORIES_API,
  GET_STORY_BY_USER_API,
  LIKE_STORY_API,
  VIEW_STORY_API,
} = storyEndpoints;

export function createStory(data, file, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", CREATE_STORY_API, data, file);

      console.log("Create Story API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log("Create Story API ERROR............", error);
    }
    dispatch(setLoading(false));
  };
}

export function getAllStories() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_ALL_STORIES_API);
      dispatch(setPosts(response.data.posts));
      console.log(
        "Get All Stories API RESPONSE............",
        response.data.posts
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log("Get All Stories API ERROR............", error);
    }
    dispatch(setLoading(false));
  };
}

export function getStoryByUser(user) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        GET_STORY_BY_USER_API,
        null,
        null,
        null,
        { user }
      );

      console.log("Get Story By User API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log("Get Story By User API ERROR............", error);
    }
    dispatch(setLoading(false));
  };
}

export function likeStory(postId, userId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PUT", LIKE_STORY_API, {
        postId,
        userId,
      });

      console.log("Like Story API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log("Like Story API ERROR............", error);
    }
    dispatch(setLoading(false));
  };
}

export function viewStory(postId, userId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PUT", VIEW_STORY_API, {
        postId,
        userId,
      });

      console.log("View Story API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log("View Story API ERROR............", error);
    }
    dispatch(setLoading(false));
  };
}
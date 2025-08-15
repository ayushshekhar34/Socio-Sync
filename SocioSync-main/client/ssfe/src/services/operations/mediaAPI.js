import { populateMedia } from "../../redux/Slices/chatSlice";
import { apiConnector } from "../apiconnector";
import { mediaEndpoints } from "../apis";

const { UPLOAD_PHOTOS_AND_VIDEOS, GET_ALL_MEDIA } = mediaEndpoints;

export function mediaUpload(file, data) {
  return async (dispatch) => {
    // dispatch(setLoading(true))
    try {
      const response = await apiConnector(
        "POST",
        UPLOAD_PHOTOS_AND_VIDEOS,
        data,
        file
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        return response.data;
      }
    } catch (error) {
      console.log("UPLOAD_PHOTOS_AND_VIDEOS API ERROR............", error);
    }
  };
}

export function getMedia(query) {
  return async (dispatch) => {
    // dispatch(setLoading(true))
    console.log("query in FE to get the media", query);
    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_MEDIA,
        null,
        null,
        null,
        { query }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        dispatch(populateMedia(response.data.allMedia));
        console.log("GET_ALL_MEDIA API RESPONSE.........", response.data);
      }
    } catch (error) {
      console.log("GET_ALL_MEDIA API ERROR............", error);
    }
  };
}

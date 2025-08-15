// import { toast } from "react-hot-toast"

// import { setLoading, setUser } from "../../slices/profileSlice"
import { useSelector } from "react-redux";
import { populateHistory } from "../../redux/Slices/chatSlice";
import { apiConnector } from "../apiconnector";
import { chatEndpoints } from "../apis";

const { SEARCH_API, SEND_CHAT_REQUEST_API, GET_CHAT_HISTORY_API } =
  chatEndpoints;

export function search(query, navigate) {
  return async (dispatch) => {
    // dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SEARCH_API, { query });
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // const userImage = response.data.data.image
      //   ? response.data.data.image
      //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      // dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      // dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error);
      // toast.error("Could Not Get User Details")
    }
    // dispatch(setLoading(false))
  };
}

export function updateChat(query) {
  return async (dispatch) => {
    // dispatch(setLoading(true))
    try {
      const response = await apiConnector("PUT", SEND_CHAT_REQUEST_API, {
        query,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        return response.data;
      }
    } catch (error) {
      console.log("SEND_CHAT_REQUEST_API API ERROR............", error);
    }
  };
}

export function getHistory(query) {
  return async (dispatch) => {
    // dispatch(setLoading(true))
    console.log("query in FE to get the history", { query });
    try {
      console.log("query just before calling gethistory api ", query);
      const response = await apiConnector(
        "GET",
        GET_CHAT_HISTORY_API,
        null,
        null,
        null,
        { query }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        dispatch(populateHistory(response.data.result));
        console.log(
          "GET_CHAT_HISTORY_API API RESPONSE.........",
          response.data
        );
      }
    } catch (error) {
      console.log("GET_CHAT_HISTORY_API API ERROR............", error);
    }
  };
}

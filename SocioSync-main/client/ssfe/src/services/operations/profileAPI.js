import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { logout } from "./authAPI";
import { setAllUsers } from "../../redux/Slices/profileSlice";
import { useSelector } from "react-redux";

const { GET_USER_DETAILS_API, GET_ALL_USERS_API } = profileEndpoints;

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
    }
  };
}

export function getAllUsers() {
  return async (dispatch) => {
    let result = [];
    try {
      const response = await apiConnector("GET", GET_ALL_USERS_API, null, {
        // Authorization: `Bearer ${token}`,
      });
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      result = response?.data?.allUsers;
      console.log("result is ...", result);
      await dispatch(setAllUsers(result));
    } catch (error) {
      console.log("GET_USER_DETAILS API ERROR............", error);
    }
  };
}

import { apiConnector } from "../apiconnector";
import { friendsEndpoints } from "../apis";
import { logout } from "./authAPI";
import { getAllUsers } from "../operations/profileAPI";

const {
  SEND_REQUEST_API,
  ACCEPT_REQUEST_API,
  DELETE_REQUEST_API,
  REJECT_REQUEST_API,
} = friendsEndpoints;

export function sendrequest(token, names, navigate, showToast, updateToast) {
  return async (dispatch) => {
    console.log("token is", token);
    console.log("name of receiver is ", names);
    const toastId = showToast({
      title: "Loading...",
      status: "loading",
      duration: null,
      isClosable: true,
      position: 'top'
    });
    try {
      const response = await apiConnector(
        "POST",
        SEND_REQUEST_API,
        { userName: names },
        null,
        {
          Authorization: `Bearer ${token || localStorage.getItem("authToken")}`,
        }
      );
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      updateToast(toastId, {
        title: "Friend request sent",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      dispatch(getAllUsers());
    } catch (error) {
      console.log("GET_USER_DETAILS API ERROR............", error);
      updateToast(toastId, {
        title: "Could Not send request !!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  };
}

export function acceptrequest(token, names, navigate, showToast, updateToast) {
  return async (dispatch) => {
    // dispatch(setLoading(true))
    const toastId = showToast({
      title: "Loading...",
      status: "loading",
      duration: null,
      isClosable: true,
      position: 'top'
    });
    try {
      const response = await apiConnector(
        "POST",
        ACCEPT_REQUEST_API,
        { userName: names },
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      updateToast(toastId, {
        title: "New friend added",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      dispatch(getAllUsers());
    } catch (error) {
      // dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
      updateToast(toastId, {
        title: "Error while accepting request",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
    // dispatch(setLoading(false))
  };
}

export function rejectrequest(token, names, navigate, showToast, updateToast) {
  return async (dispatch) => {
    // dispatch(setLoading(true))
    const toastId = showToast({
      title: "Loading...",
      status: "loading",
      duration: null,
      isClosable: true,
      position: 'top'
    });
    try {
      const response = await apiConnector(
        "DELETE",
        REJECT_REQUEST_API,
        { userName: names },
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      updateToast(toastId, {
        title: "Friend request rejected",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      dispatch(getAllUsers());
    } catch (error) {
      console.log(token);
      console.log(names);
      updateToast(toastId, {
        title: "Error !! Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      // dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
    }
    // dispatch(setLoading(false))
  };
}

export function deleterequest(token, names, navigate, showToast, updateToast) {
  return async (dispatch) => {
    // dispatch(setLoading(true))
    console.log("frontend mein names is ...", names);
    const toastId = showToast({
      title: "Loading...",
      status: "loading",
      duration: null,
      isClosable: true,
      position: 'top'
    });
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_REQUEST_API,
        { userName: names },
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(getAllUsers());
      updateToast(toastId, {
        title: "Friend request deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      updateToast(toastId, {
        title: "Error !! Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      // dispatch(logout(navigate))
    }
  };
}

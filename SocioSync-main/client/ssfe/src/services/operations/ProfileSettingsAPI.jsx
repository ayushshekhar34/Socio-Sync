import { setUser } from "../../redux/Slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { profileSettingsEndpoints } from "../apis";
import { logout } from "./authAPI";
import { useSelector } from "react-redux";
import { setLoginData } from "../../redux/Slices/authSlice";
const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  // DELETE_PROFILE_API,
} = profileSettingsEndpoints;
// const {loginData} = useSelector((state) => state.auth);
export function updateDisplayPicture(token, formData, showToast, updateToast) {
  console.log("opns me dp is", formData);
  return async (dispatch) => {
    // const { showToast, updateToast } = useCustomToast();

    const toastId = showToast({
      title: "Loading...",
      status: "loading",
      duration: null,
      isClosable: true,
      position: 'top'
    });
    try {
      // console.log(formData);
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        null,
        formData,
        {
          "Content-Type": "multipart/form-data",
          // to be studied
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      updateToast(toastId, {
        title: "Display Picture Updated Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      dispatch(setLoginData(response.data.data));
      const localLoginData = localStorage.getItem('logindata');
      let existingData = JSON.parse(localLoginData);
      existingData = response.data.data;
      console.log("new ldata is", existingData);
      localStorage.setItem('logindata',JSON.stringify(existingData));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);

        updateToast(toastId, {
          title: "Could Not Update Display Picture",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      }
  };
}

export function updateProfile(token, formData, showToast, updateToast) {
  // const {loginData} = useSelector((state) => state.auth);
  return async (dispatch) => {
    console.log("backend data type is", typeof(formData))
    console.log("data to backend", formData);
    const toastId = showToast({
      title: "Loading...",
      status: "loading",
      duration: null,
      isClosable: true,
      position: 'top'
    });
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, null,{
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_PROFILE_API API RESPONSE............", response);
      console.log("response aaya", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setLoginData(response.data.updatedUserDetails));
      const localLoginData = localStorage.getItem('logindata');
      let existingData = JSON.parse(localLoginData);
      existingData = response.data.updatedUserDetails;
      console.log("ldata aftr update is", existingData);
      localStorage.setItem('logindata',JSON.stringify(existingData));
      updateToast(toastId, {
        title: "profile details updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error);
        updateToast(toastId, {
          title: "Could Not Update profile details",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
    }
  };
}

export async function changePassword(token, formData, showToast, updateToast) {
  console.log("ic data", formData);
  const toastId = showToast({
    title: "Loading...",
    status: "loading",
    duration: null,
    isClosable: true,
    position: 'top'
  });
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    updateToast(toastId, {
      title: "Password changed Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error);
      updateToast(toastId, {
        title: "Incorrect Password !!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
  }
}
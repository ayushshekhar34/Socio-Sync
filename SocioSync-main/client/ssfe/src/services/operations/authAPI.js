import { useToast } from "@chakra-ui/react";
import {
  setLoading,
  setLoginData,
  setToken,
} from "../../redux/Slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { useSelector } from "react-redux";
import { setRoom } from "../../redux/Slices/onlineSlice";

const { SENDOTP_API, SIGNUP_API, LOGIN_API, FORGOTPASSWORD_API } = endpoints;

export function sendOtp(action, email, navigate, showToast, updateToast) {
  // this function is sending emailid to the sendOTP function
  // in the backend so that it can send email to the desired email id
  return async () => {
    // dispatch(setLoading(true))
    const toastId = showToast({
      title: "Sending OTP",
      status: "loading",
      duration: null,
      isClosable: true,
      position: 'top'
    });
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email, action
      });

      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        // can me response.success as well
        throw new Error(response.data.message);
      }
      updateToast(toastId, {
        title: "OTP sent",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      navigate("/verify-email", {state: {message: action}});
    } catch (error) {
      updateToast(toastId, {
        title: "Error in sending OTP !!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      console.log("SENDOTP API ERROR............", error);
    }
  };
}

export function signUp(ultraNewSignupData, navigate, showToast, updateToast) {
  return async () => {
    console.log("the otp in signUp is", ultraNewSignupData.otp);
    console.log("name in signup is ", ultraNewSignupData.name);
    const toastId = showToast({
      title: "Creating account",
      status: "loading",
      duration: null,
      isClosable: true,
      position: 'top'
    });
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        ultraNewSignupData,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      updateToast(toastId, {
        title: "Account created successfully !!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      navigate("/login");
    } catch (error) {
      updateToast(toastId, {
        title: "Username or email already exists",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      console.log("SIGNUP API ERROR............", error);
      navigate("/signup");
    }
  };
}

export function login(formData, navigate, showToast, updateToast) {
  return async (dispatch) => {
    const toastId = showToast({
      title: "Logging in...",
      status: "loading",
      duration: null,
      isClosable: true,
      position: 'top'
    });
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        formData,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // updating the slice token to store the token details
      // console.log("toast check")
      updateToast(toastId, {
        title: "Logged in Succesfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      console.log("LOGIN API RESPONSE............", response);
      console.log("user login hua h", response.data.user.userName);
      dispatch(setToken(response.data.token));
      dispatch(setLoginData(response.data.user));
      console.log("data incoming for login data is",response.data.user)
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("logindata", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      updateToast(toastId, {
        title: "Enter correct details",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      console.log("LOGIN API ERROR............", error);
    }
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setRoom(null));
    dispatch(setToken(null));
    localStorage.clear();
    navigate("/");
  };
}

// export function changePassword(oldPassword, newPassword, confirmPassword, navigate) {
//   return async (dispatch) => {
//       const toastId = toast.loading("Loading...")
//       dispatch(setLoading(true))
//       try {
//       const response = await apiConnector("POST", CHANGEPASSWORD_API, {
//           oldPassword,
//           newPassword,
//           confirmPassword,
//           navigate,
//       })

//       console.log("Change password API RESPONSE............", response)

//       if (!response.data.success) {
//           throw new Error(response.data.message)
//       }

//       toast.success("Password changed Successfully")
//       }

//       catch (error) {
//       console.log("LOGIN API ERROR............", error)
//       toast.error("Password could not be changed")
//       // TODO:-navigate to my profile
//       // navigate("/dashboard/my-profile")
//       }
//       // TODO:-navigate to my profile
//       dispatch(setLoading(false))
//       toast.dismiss(toastId)
//   }
// }

export function forgotPassword(ultraNewSignupData,navigate,showToast, updateToast)
{
  console.log("sending data", ultraNewSignupData);
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = showToast({
      title: "verifying OTP",
      status: "loading",
      duration: null,
      isClosable: true,
      position: 'top'
    });
    try {
      const response = await apiConnector("PUT", FORGOTPASSWORD_API, {ultraNewSignupData});

      console.log("Change password API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      updateToast(toastId, {
        title: "Password changed !!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      navigate("/login");
      // toast.success("Password changed Successfully");
    } catch (error) {
      updateToast(toastId, {
        title: "Incorrect OTP",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      console.log("FORGOTPASSWORD API ERROR............", error);
      // toast.error("Password could not be changed");
      navigate("/forgotPassword");
    }
    console.log("password change ho gya");
    navigate("/login");
    dispatch(setLoading(false));
    // toast.dismiss(toastId);
  };
}

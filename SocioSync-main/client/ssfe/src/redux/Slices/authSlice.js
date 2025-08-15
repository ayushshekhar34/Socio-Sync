import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    signupData: null,
    loginData: null,
    loading: false,
    token: null,
  },
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setLoginData(state, value) {
      state.loginData = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken, setLoginData } =
  authSlice.actions;

export default authSlice.reducer;

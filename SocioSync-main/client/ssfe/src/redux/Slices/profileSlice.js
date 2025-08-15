import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    allUsers: [],
    friends: [],
    requests: [],
    invites: [],
    explore: [],
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    setFriends(state, action) {
      state.friends = action.payload;
    },
    setInvites(state, action) {
      state.invites = action.payload;
    },
    setRequests(state, action) {
      state.requests = action.payload;
    },
    setExplore(state, action) {
      state.explore = action.payload;
    },
  },
});

export const {
  setUser,
  setAllUsers,
  setFriends,
  setInvites,
  setRequests,
  setExplore,
} = profileSlice.actions;

export default profileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const storySlice = createSlice({
  name: "story",
  initialState: {
    allPosts: [],
  },
  reducers: {
    setPosts(state, action) {
      state.allPosts = action.payload;
    },
  },
});

export const { setPosts } = storySlice.actions;

export default storySlice.reducer;

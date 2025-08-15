import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    // sentMessages: [],
    // receivedMessages: [],
    allMessages: [],
    history: [],
    messagesToBeUpdated: [],
    allMedia: [],
  },
  reducers: {
    // Reducer for handling sent messages
    addSentMessage: (state, action) => {
      const { user, message, timestamp } = action.payload;
      state.sentMessages.push({ user, message, timestamp });
    },

    // Reducer for handling received messages
    addReceivedMessage: (state, action) => {
      const { user, message, timestamp } = action.payload;
      state.receivedMessages.push({ user, message, timestamp });
    },

    setLoading(state, value) {
      state.loading = value.payload;
    },

    addMessage: (state, action) => {
      // const {sender, receiver, message, owner, chatType, groupId, time} = action.payload;
      // const timestamp = Date.now();
      state.allMessages.push(action.payload);
    },

    populateHistory: (state, action) => {
      state.history = action.payload ? action.payload : [];
    },

    addMessagesToBeUpdated: (state, action) => {
      state.messagesToBeUpdated.push(action.payload);
    },
    populateMedia: (state, action) => {
      state.allMedia.push(action.payload);
    },
    clearChatSlices: (state) => {
      state.allMessages = [];
      state.history = [];
      state.messagesToBeUpdated = [];
      state.allMedia = [];
    },
  },
});

export const {
  addSentMessage,
  addReceivedMessage,
  setLoading,
  addMessage,
  populateHistory,
  addMessagesToBeUpdated,
  populateMedia,
  clearChatSlices
} = chatSlice.actions;
export default chatSlice.reducer;

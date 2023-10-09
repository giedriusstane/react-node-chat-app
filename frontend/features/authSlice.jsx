import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isAutologin: true,
    currentUserId: "",
    selectedUserId: "",
  },

  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },

    autologin: (state, action) => {
      state.isAutologin = action.payload;
    },

    updateCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },

    updateSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
  },
});

export const {
  login,
  logout,
  autologin,
  updateCurrentUserId,
  updateSelectedUserId,
} = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isAutologin: true,
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
  },
});

export const { login, logout, autologin } = authSlice.actions;
export default authSlice.reducer;

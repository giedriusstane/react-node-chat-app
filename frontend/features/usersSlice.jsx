import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    msgModalVisibility: true,
    singlePostVisibility: true,
  },

  reducers: {
    updateMsgModalVisibility: (state, action) => {
      state.msgModalVisibility = action.payload;
    },

    updateSinglePostVisibility: (state, action) => {
      state.singlePostVisibility = action.payload;
    },
  },
});

export const { updateMsgModalVisibility, updateSinglePostVisibility } =
  usersSlice.actions;
export default usersSlice.reducer;

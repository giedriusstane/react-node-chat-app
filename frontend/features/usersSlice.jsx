import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    msgModalVisibility: true,
  },

  reducers: {
    updateMsgModalVisibility: (state, action) => {
      state.msgModalVisibility = action.payload;
    },
  },
});

export const { updateMsgModalVisibility } = usersSlice.actions;
export default usersSlice.reducer;

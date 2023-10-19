import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    msgModalVisibility: true,
    singlePostVisibility: true,
    selectedPostSendersId: "",
    sendersIdMadeLike: [],
  },

  reducers: {
    updateMsgModalVisibility: (state, action) => {
      state.msgModalVisibility = action.payload;
    },

    updateSinglePostVisibility: (state, action) => {
      state.singlePostVisibility = action.payload;
    },

    updateSelectedPostSendersId: (state, action) => {
      state.selectedPostSendersId = action.payload;
    },

    updateSendersIdMadeLike: (state, action) => {
      state.sendersIdMadeLike = action.payload;
    },
  },
});

export const {
  updateMsgModalVisibility,
  updateSinglePostVisibility,
  updateSelectedPostSendersId,
  updateSendersIdMadeLike,
} = usersSlice.actions;
export default usersSlice.reducer;

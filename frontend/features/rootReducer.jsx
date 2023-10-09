import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import usersReducer from "./usersSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

export default rootReducer;

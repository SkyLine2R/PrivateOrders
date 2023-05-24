import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./slice";
import usersReducer from "./users-slice";

export default configureStore({
  reducer: inputReducer,
  usersReducer,
});

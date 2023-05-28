import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./slice";
import snackbar from "./slice-snackbar";
import usersReducer from "./users-slice";

export default configureStore({
  reducer: { inputSlice: inputReducer, users: usersReducer, snackbar },
});

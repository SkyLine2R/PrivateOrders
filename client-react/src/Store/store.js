import { configureStore } from "@reduxjs/toolkit";
import vendorCodes from "./slice-vendor-codes";
import snackbar from "./slice-snackbar";
import usersReducer from "./users-slice";

export default configureStore({
  reducer: { vendorCodes, users: usersReducer, snackbar },
});

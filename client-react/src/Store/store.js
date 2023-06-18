import { configureStore } from "@reduxjs/toolkit";
import vendorCodes from "./Slices/slice-vendor-codes";
import snackbar from "./Slices/slice-snackbar";
import users from "./Slices/slice-users";
import customers from "./Slices/slice-customers";

export default configureStore({
  reducer: { vendorCodes, users, customers, snackbar },
});

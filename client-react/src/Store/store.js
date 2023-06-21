import { configureStore } from "@reduxjs/toolkit";
import vendorCodes from "./Slices/slice-vendor-codes";
import customers from "./Slices/slice-customers";
import snackbar from "./Slices/slice-snackbar";
import users from "./Slices/slice-users";
import colors from "./Slices/slice-colors";

export default configureStore({
  reducer: { vendorCodes, users, customers, colors, snackbar },
});

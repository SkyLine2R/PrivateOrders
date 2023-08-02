import { configureStore } from "@reduxjs/toolkit";
import vendorCodes from "./Slices/slice-vendor-codes";
import customers from "./Slices/slice-customers";
import snackbar from "./Slices/slice-snackbar";
import users from "./Slices/slice-users";
import colors from "./Slices/slice-colors";
import documentsInStock from "./Slices/slice-instock-documents";
import alert from "./Slices/slice-alert-dialog";
import stock from "./Slices/slice-stock";
import inStock from "./Slices/slice-inStock";
import quickSearch from "./Slices/slice-quick-search";
import units from "./Slices/slice-units";

export default configureStore({
  reducer: {
    vendorCodes,
    users,
    customers,
    colors,
    snackbar,
    documentsInStock,
    alert,
    stock,
    inStock,
    quickSearch,
    units,
  },
});

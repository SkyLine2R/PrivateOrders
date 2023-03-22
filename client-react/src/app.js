import * as React from "react";
// import { createContext } from "react";
// import Button from "@mui/material/Button";
import EditVendorCodeDialog from "./edit-vendor-code-dialog/edit-vendor-code-dialog";
import CustomizedSnackbars from "./snackbar/snackbar";

export default function App() {
  return (
    <div>
      <EditVendorCodeDialog />
      <CustomizedSnackbars view="true" />
    </div>
  );
}

// export default App;

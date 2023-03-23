import * as React from "react";
// import { createContext } from "react";
// import Button from "@mui/material/Button";
import { connect } from "react-redux";

import EditVendorCodeDialog from "./edit-vendor-code-dialog/edit-vendor-code-dialog";
import CustomizedSnackbars from "./snackbar/snackbar";

const mapStateToProps = (state) => ({
  error: state.error,
});
const a = connect(mapStateToProps)(App);
console.log(a);
export default function App() {
  return (
    <div>
      <EditVendorCodeDialog />
      <CustomizedSnackbars view={a} />
    </div>
  );
}

// export default App;

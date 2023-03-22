import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  const [open, setOpen] = React.useState(false);
  const { status, error } = { ...useSelector((state) => state.error) };
  //setOpen(true);
  const error1 = "Fetching error";
  console.log(props);

  const align = { vertical: "bottom", horizontal: "right" };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Cars.js
  /* const mapStateToProps = state => ({
  cars: state.cars
})
export default connect(mapStateToProps)(Cars) */

  if (status === "rejected") {
    handleClick();
  }

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ ...align }}
      >
        <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
          {error1}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

/*       <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */

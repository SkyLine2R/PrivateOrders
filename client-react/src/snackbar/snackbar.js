import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { snackOpen, snackClose } from "../slice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  // const [open, setOpen] = React.useState(false);
  const snackState = {
    ...useSelector((state) => state.snackbars),
  };

  console.log(snackState);

  const error1 = "Fetching error";
  const align = { vertical: "bottom", horizontal: "right" };

  /*   const open = () => {
    dispatch(snackOpen);
  }; */
  /* 
  const close = () => {
    dispatch(snackClose);
  }; */

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={() => snackState.setOpen}
        autoHideDuration={6000}
        onClose={() => dispatch(snackClose)}
        anchorOrigin={{ ...align }}
      >
        <Alert
          severity="error"
          onClose={() => dispatch(snackClose)}
          sx={{ width: "100%" }}
        >
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

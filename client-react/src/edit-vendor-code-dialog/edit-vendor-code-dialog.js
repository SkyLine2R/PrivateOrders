import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DataGrid from "../vendor-code-table/vendor-code-table.js";
import EditVendorCodeForm from "../edit-vendor-code-form/edit-vendor-code-form.js";
import Box from "@mui/material/Box";
import { useReducer } from "react";

const initialState = "";
const appReducer = (state, event) => {
  console.log("state:" + state);
  console.log("event:" + event);
  return {
    state1: reducer1(state.state1, event),
    state2: reducer2(state.state2, event),
  };
};
const action = () => appReducer.state2;

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [state, dispatch] = useReducer(action, initialState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        + Добавить новый артикул
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Добавление нового артикула</DialogTitle>
        <DialogContent
          onClick={(e) => {
            /*             console.log(e.target.title);
            console.log(e.target); */
            dispatch(appReducer);
          }}
        >
          <EditVendorCodeForm />

          <Box sx={{ mt: 5 }}>
            <DialogContentText>Артикулы в базе</DialogContentText>

            <DataGrid />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleClose}>Добавить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

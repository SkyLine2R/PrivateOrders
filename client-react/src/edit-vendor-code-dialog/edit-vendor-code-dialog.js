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

export default function FormDialog() {
  const initialState = "";
  const action = {
    type: "updateData",
  };
  function reducer(e) {
    console.log(e);
  }
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
        onClick={(e) => {
          console.log(e);
          dispatch(action);
        }}
      >
        <DialogTitle>Добавление нового артикула</DialogTitle>
        <DialogContent /* onClick={(e) => console.log(e)} */>
          <EditVendorCodeForm />

          <Box sx={{ mt: 5 }}>
            <DialogContentText>Артикулы в базе</DialogContentText>

            <DataGrid
              onCellClick={(GridCellParams, event, GridCallbackDetails) => {
                dispatch(action);
                console.log(GridCellParams);
              }}
            />
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

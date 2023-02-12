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
import FieldForInput from "../field-for-input/field-for-input.js";

import { useSelector, useDispatch } from "react-redux";
import { textСorrectionInField, liveFilter } from "../slice";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const inputVendorCode = useSelector((state) => state.vendorCode);
  const dispatch = useDispatch();

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
          label="Артикул"
          onChange={(event) => {
            console.log("event onChange in input field");
            dispatch(textСorrectionInField());
            //event.target.value = textСorrectionInField(
            //itemsDB[event.target.id],
            //event.target.value
            //);
          }}
        >
          <EditVendorCodeForm
            vendorCodeInput={
              <FieldForInput
                id="vendorCode"
                onChange={(event) => {
                  console.log("event onChange in input field");
                  dispatch(textСorrectionInField());
                  //event.target.value = textСorrectionInField(
                  //itemsDB[event.target.id],
                  //event.target.value
                  //);
                }}
              />
            }
          />

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

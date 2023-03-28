/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";

import testSendData from "../../../components/testing-data-from-input";
import dbSchema from "../../../components/items-db_schema";
import { sendNewVendorCode } from "../slice";

// eslint-disable-next-line no-unused-vars

import DataGrid from "../vendor-code-table/vendor-code-table";
import EditVendorCodeForm from "../edit-vendor-code-form/edit-vendor-code-form";
// import FieldForInput from "../field-for-input/field-for-input";

// eslint-disable-next-line no-unused-vars
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const stateData = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNewArticle = () => {
    dispatch(sendNewVendorCode(dbSchema));
    /* if (stateData.) */
  };

  const addVendorCode = () => {};

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        + Добавить новый артикул
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Добавление нового артикула</DialogTitle>
        <DialogContent label="Артикул">
          <EditVendorCodeForm />

          <Box sx={{ mt: 5 }}>
            <DialogContentText>Артикулы в базе</DialogContentText>

            <DataGrid />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleAddNewArticle}>Добавить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

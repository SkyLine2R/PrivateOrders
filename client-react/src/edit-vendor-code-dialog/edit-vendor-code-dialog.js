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
import { useDispatch, useSelector } from "react-redux";
import dbSchema from "../../../components/items-db_schema";
import { sendNewVendorCode } from "../slice";

import DataGrid from "../vendor-code-table/vendor-code-table";
import EditVendorCodeForm from "../edit-vendor-code-form/edit-vendor-code-form";

export default function FormDialog() {
  const lastVendorCodeId = useSelector((myState) => myState.lastVendorCodeId);

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNewArticle = () => {
    dispatch(sendNewVendorCode(dbSchema));
  };
  // const addVendorCode = () => {};

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

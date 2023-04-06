import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import dbSchema from "../../../components/items-db_schema";
import { setModalWindowVendorCodeOpen, sendNewVendorCode } from "../slice";

import DataGrid from "../vendor-code-table/vendor-code-table";
import EditVendorCodeForm from "../edit-vendor-code-form/edit-vendor-code-form";

export default function FormDialog() {
  const modalWindowVendorCodeOpen = useSelector(
    (state) => state.modalWindowVendorCodeOpen
  );
  const dispatch = useDispatch();

  const handleClickOpenClose = () => {
    dispatch(setModalWindowVendorCodeOpen());
  };

  const handleAddNewArticle = () => {
    dispatch(sendNewVendorCode(dbSchema));
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpenClose}>
        + Добавить новый артикул
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalWindowVendorCodeOpen}
        onClose={handleClickOpenClose}
      >
        <DialogTitle>Добавление нового артикула</DialogTitle>
        <DialogContent label="Артикул">
          <EditVendorCodeForm />

          <Box sx={{ mt: 5 }}>
            <DialogContentText>Артикулы в базе</DialogContentText>

            <DataGrid />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClickOpenClose}>Отмена</Button>
          <Button onClick={handleAddNewArticle}>Добавить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

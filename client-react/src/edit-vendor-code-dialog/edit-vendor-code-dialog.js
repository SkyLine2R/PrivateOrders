/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { useDispatch, useSelector } from "react-redux";

import fetchVendorCodes from "../Store/fetchVendorCodes";
import { copyPasteValue } from "../Store/Slices/slice-vendor-codes";

import DataGrid from "../data-grid-table/data-grid-table";
import EditVendorCodeForm from "../edit-vendor-code-form/edit-vendor-code-form";

export default function FormDialog({
  menuEditType = "add",
  handleClickOpenClose,
  handleAddNewItem,
  handleEditItem,
  modalWindowIsOpen,
  dbSchema,
  catalog,
}) {
  const dispatch = useDispatch();

  const { vendorCode, itemName } = useSelector(
    ({ vendorCodes }) => vendorCodes.inputFields
  );

  // при изменении артикула или наименования - запрос на сервер

  React.useEffect(
    () => dispatch(fetchVendorCodes()),
    [dispatch, vendorCode, itemName]
  );

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpenClose}>
        + Добавить новый артикул
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalWindowIsOpen}
        onClose={handleClickOpenClose}
      >
        <Box
          sx={{
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            ml: "24px",
            mt: "8px",
          }}
        >
          {menuEditType === "add" ? (
            <>
              <ControlPointIcon
                fontSize="large"
                sx={{ color: "primary.dark" }}
              />

              <DialogTitle>Добавление нового артикула</DialogTitle>
            </>
          ) : (
            <>
              <ModeEditIcon fontSize="large" sx={{ color: "primary.dark" }} />
              <DialogTitle>Редактирование артикула</DialogTitle>
            </>
          )}
        </Box>
        <DialogContent label="Артикул" sx={{ pt: 0 }}>
          <EditVendorCodeForm dbSchema={dbSchema} />
          {menuEditType !== "add" ? (
            ""
          ) : (
            <Box sx={{ mt: "15px" }}>
              <DialogContentText>Артикулы в базе</DialogContentText>
              <DataGrid
                dbSchema={dbSchema}
                catalog={catalog}
                onCellClick={(gridCellParams) => {
                  dispatch(
                    copyPasteValue({
                      id: gridCellParams.id,
                      fieldId: gridCellParams.field,
                    })
                  );
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ mr: "18px" }}>
          <Button onClick={handleClickOpenClose}>Отмена</Button>
          {menuEditType === "add" ? (
            <Button onClick={handleAddNewItem}>Добавить</Button>
          ) : (
            <Button onClick={handleEditItem}>Сохранить изменения</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

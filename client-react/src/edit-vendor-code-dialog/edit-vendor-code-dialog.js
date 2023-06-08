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

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import dbSchema from "../../../components/vendor-codes-db_schema";
import fetchVendorCodes from "../Store/fetchVendorCodes";
import sendNewEntryToDB from "../Store/sendNewEntryToDB";
import {
  setModalWindowVendorCodeOpen,
  copyPasteValue,
} from "../Store/Slices/slice-vendor-codes";

import DataGrid from "../data-grid-table/data-grid-table";
import EditVendorCodeForm from "../edit-vendor-code-form/edit-vendor-code-form";
import sendChangedEntryToDB from "../Store/sendChangedEntryToDB";

export default function FormDialog({ menuEditType }) {
  const dispatch = useDispatch();

  const { modalWindowVendorCodeOpen } = useSelector(
    ({ vendorCodes }) => vendorCodes
  );
  const { vendorCode, itemName } = useSelector(
    ({ vendorCodes }) => vendorCodes.inputFields
  );

  // при изменении артикула или наименования - запрос на сервер

  React.useEffect(
    () => dispatch(fetchVendorCodes()),
    [dispatch, vendorCode, itemName]
  );

  const handleClickOpenClose = () => {
    dispatch(setModalWindowVendorCodeOpen());
  };
  const handleAddNewVendorCode = () => {
    dispatch(sendNewEntryToDB({ dbSchema, api: "vendorCodes" }));
  };
  const handleEditVendorCode = () => {
    dispatch(sendNewEntryToDB({ dbSchema, api: "vendorCodes" }));
  };
  const { vendorCodesArr } = useSelector(
    ({ vendorCodes }) => vendorCodes,
    shallowEqual
  );

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
          <EditVendorCodeForm />
          {menuEditType !== "add" ? (
            ""
          ) : (
            <Box>
              <DialogContentText>Артикулы в базе</DialogContentText>
              <DataGrid
                dbSchema={dbSchema}
                dataArr={vendorCodesArr}
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
            <Button onClick={handleAddNewVendorCode}>Добавить</Button>
          ) : (
            <Button onClick={handleEditVendorCode}>Сохранить изменения</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

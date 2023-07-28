/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { useDispatch, useSelector } from "react-redux";

import fetchVendorCodes from "../Store/fetchVendorCodes";
import { copyPasteValue } from "../Store/Slices/slice-vendor-codes";

import DataGrid from "../base-elements/data-grid-table";
import TitleDialog from "../base-elements/dialog-title";
import EditVendorCodeForm from "../forms/edit-vendor-code-form";

export default function FormDialog({
  menuEditType = "add",
  handleClickOpenClose,
  handleAddNewItem,
  handleEditItem,
  modalWindowIsOpen,
  tableSchema,
  dbSchema,
  catalog,
}) {
  const dispatch = useDispatch();

  const { vendorCode, name, notes } = useSelector(
    ({ vendorCodes }) => vendorCodes.inputFields
  );

  const { status } = useSelector(({ vendorCodes }) => vendorCodes.request);

  const loading = status === "loading";

  // при изменении артикула или наименования - запрос на сервер

  React.useEffect(
    () => dispatch(fetchVendorCodes()),
    [dispatch, vendorCode, name, notes]
  );

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalWindowIsOpen}
        onClose={handleClickOpenClose}
      >
        <TitleDialog
          menuEditType={menuEditType}
          IconNew={ControlPointIcon}
          IconEdit={ModeEditIcon}
          titleNew="Добавление нового артикула"
          titleEdit="Редактирование артикула"
        />

        <DialogContent label="Артикул" sx={{ pt: 0 }}>
          <EditVendorCodeForm dbSchema={dbSchema} />
          {menuEditType !== "add" ? (
            ""
          ) : (
            <Box sx={{ mt: "15px", height: "50vh" }}>
              <DialogContentText>Артикулы в базе</DialogContentText>
              <DataGrid
                dbSchema={dbSchema}
                tableSchema={tableSchema}
                catalog={catalog}
                onCellClick={(gridCellParams) => {
                  dispatch(
                    copyPasteValue({
                      id: gridCellParams.id,
                      fieldId: gridCellParams.field,
                    })
                  );
                }}
                loading={loading}
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

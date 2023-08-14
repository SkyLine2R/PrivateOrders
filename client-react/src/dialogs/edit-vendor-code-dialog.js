/* eslint-disable no-nested-ternary */
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

import { changeValue } from "../Store/Slices/slice-vendor-codes";
import fetchEntries from "../Store/fetchEntries";

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

  const vendorCode = useSelector(
    (store) => store.vendorCodes.inputFields.vendorCode
  );
  const name = useSelector((store) => store.vendorCodes.inputFields.name);
  const notes = useSelector((store) => store.vendorCodes.inputFields.notes);
  const status = useSelector((store) => store.vendorCodes.request);
  const unitsForSelect = useSelector((store) => store.units.catalog);

  const loading = status === "loading";

  // при изменении артикула, наименования или примечания - запрос на сервер
  // фильтр срабатывает только для одного введённого поля, остальные игнорятся
  React.useEffect(() => {
    const filledFieldCount = [vendorCode, name, notes].reduce(
      (count, item) => count + (item ? 1 : 0),
      0
    );
    if (filledFieldCount > 1) return;

    const columns = [`${notes ? "notes" : name ? "name" : "vendorCode"}`];
    const string = notes || name || vendorCode || "";

    dispatch(
      fetchEntries({
        api: "vendorCodes",
        type: "getFiltered",
        columns,
        string,
      })
    );
  }, [dispatch, vendorCode, name, notes]);

  // копирование данных в поле ввода кликом по ячейке
  const copyPasteValue = (gridCellParams) => {
    const fieldId = gridCellParams.field;
    const value =
      fieldId !== "unit"
        ? gridCellParams.value
        : unitsForSelect.find((item) => item.name === gridCellParams.value).id;
    dispatch(changeValue({ fieldId, value }));
  };

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
                onCellClick={copyPasteValue}
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

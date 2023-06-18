/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector } from "react-redux";
import FieldForInput from "../field-for-input/field-for-input";
import { changeValue } from "../Store/Slices/slice-customers";

export default function FormDialog({
  menuEditType,
  handleClickOpenClose,
  handleAddNewItem,
  handleEditItem,
  modalWindowIsOpen,
  dbSchema,
}) {
  const { name, notes } = useSelector((state) => state.customers.inputFields);

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={modalWindowIsOpen}
        onClose={handleClickOpenClose}
      >
        <DialogTitle sx={{ paddingLeft: "30px" }}>
          {menuEditType === "add"
            ? "Новый склад"
            : menuEditType === "edit"
            ? "Редактирование данных склада"
            : ""}
        </DialogTitle>
        <Grid container spacing={2} sx={{ margin: "0px" }}>
          <DialogContent label="Название склада заказчика">
            <Grid xs={12}>
              <FieldForInput
                id="name"
                label="Склад"
                changeValue={changeValue}
                value={name}
                dbSchema={dbSchema}
              />
            </Grid>

            <Grid xs={12}>
              <FieldForInput
                id="notes"
                label="Примечания"
                changeValue={changeValue}
                value={notes}
                dbSchema={dbSchema}
              />
            </Grid>
          </DialogContent>
        </Grid>
        <DialogActions>
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

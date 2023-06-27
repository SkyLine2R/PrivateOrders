/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import AddHomeIcon from "@mui/icons-material/AddHome";
import TitleDialog from "../base-elements/dialog-title";
import FieldForInput from "../base-elements/field-for-input";
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
        <Grid>
          <TitleDialog
            menuEditType={menuEditType}
            IconNew={AddHomeIcon}
            IconEdit={EditIcon}
            titleNew="Новый склад"
            titleEdit="Редактирование данных склада"
          />
          <DialogContent label="Название склада заказчика">
            <FieldForInput
              id="name"
              label="Склад"
              changeValue={changeValue}
              value={name}
              dbSchema={dbSchema}
            />

            <Grid sx={{ pt: 2 }}>
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
        <DialogActions sx={{ pr: 2 }}>
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

/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import { useDispatch, useSelector } from "react-redux";
import FieldForInput from "../base-elements/field-for-input";
import { changeValue } from "../Store/Slices/slice-users";

export default function FormDialog({
  menuEditType,
  handleClickOpenClose,
  handleAddNewItem,
  handleEditItem,
  modalWindowIsOpen,
  dbSchema,
}) {
  const { number, name } = useSelector((state) => state.users.inputFields);

  const dispatch = useDispatch();

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={modalWindowIsOpen}
        onClose={handleClickOpenClose}
      >
        <DialogTitle sx={{ paddingLeft: "30px" }}>
          {menuEditType === "add" ? "Новый документ" : "Изменить документ"}
        </DialogTitle>
        <Grid container spacing={2} sx={{ margin: "0px" }}>
          <DialogContent label="Дата">
            <Grid xs={12}>
              <FieldForInput
                id="name"
                label="Название"
                changeValue={changeValue}
                value={name}
                dbSchema={dbSchema}
              />
            </Grid>
            <Grid xs={12}>
              <FieldForInput
                id="number"
                label="Номер"
                changeValue={changeValue}
                value={number}
                dbSchema={dbSchema}
              />
            </Grid>
            <Grid xs={12}>
              <Box sx={{ paddingTop: "20px" }}>
                <FieldForInput
                  id="notes"
                  label="Примечания к документу"
                  changeValue={changeValue}
                  value={number}
                  dbSchema={dbSchema}
                />
              </Box>
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

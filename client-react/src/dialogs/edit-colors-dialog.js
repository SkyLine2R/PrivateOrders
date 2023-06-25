/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector, useDispatch } from "react-redux";
import FieldForInput from "../base-elements/field-for-input";
import { changeValue, addTooltip } from "../Store/Slices/slice-colors";
import ArrowTooltip from "../base-elements/arrow-tooltip";
import arrowTooltip from "../components/arrowTooltip-for-colors";

export default function FormDialog({
  menuEditType,
  handleClickOpenClose,
  handleAddNewItem,
  handleEditItem,
  modalWindowIsOpen,
  dbSchema,
}) {
  const dispatch = useDispatch();
  const { name, notes } = useSelector((state) => state.colors.inputFields);

  const handleAddToolTip = (e) => {
    dispatch(addTooltip(e.target.value));
    console.log(e.target.value);
  };

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
            ? "Новый цвет"
            : menuEditType === "edit"
            ? "Редактирование цвета"
            : ""}
        </DialogTitle>
        <Grid container spacing={2} sx={{ margin: "0px" }}>
          <DialogContent label="Название цвета">
            <Grid xs={12}>
              <FieldForInput
                id="name"
                label="Цвет"
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
            <Grid xs={12} onClick={handleAddToolTip}>
              {arrowTooltip.map(({ id, tooltip, value }) => (
                <ArrowTooltip
                  id={id}
                  key={id}
                  tooltip={tooltip}
                  value={value}
                />
              ))}
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

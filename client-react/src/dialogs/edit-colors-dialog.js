/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Unstable_Grid2";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import { useSelector, useDispatch } from "react-redux";
import FieldForInput from "../base-elements/field-for-input";
import { changeValue, addTooltip } from "../Store/Slices/slice-colors";
import ArrowTooltip from "../base-elements/arrow-tooltip";
import arrowTooltip from "../components/arrowTooltips/arrowTooltip-for-colors";
import TitleDialog from "../base-elements/dialog-title";

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
  };

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
            IconNew={InvertColorsIcon}
            IconEdit={BorderColorIcon}
            titleNew="Новый цвет"
            titleEdit="Редактирование цвета"
          />
          <DialogContent label="Название цвета">
            <FieldForInput
              id="name"
              label="Цвет"
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
            <Grid sx={{ pt: 2 }} onClick={handleAddToolTip}>
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

/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Unstable_Grid2";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import { useSelector, useDispatch } from "react-redux";
import FieldForInput from "../base-elements/field-for-input";
import TitleDialog from "../base-elements/dialog-title";
import { changeValue } from "../Store/Slices/slice-instock-documents";

export default function FormDialog({
  menuEditType,
  handleClickOpenClose,
  handleAddNewItem,
  handleEditItem,
  modalWindowIsOpen,
  dbSchema,
}) {
  const dispatch = useDispatch();
  const { number, name, date, notes } = useSelector(
    (state) => state.documentsInStock.inputFields
  );

  const handleChangeDate = (newDate) => {
    dispatch(
      changeValue({
        fieldId: "date",
        value: new Date(newDate.$d).toLocaleString(),
      })
    );
  };
  React.useEffect(() =>
    handleChangeDate(new Date(Date.now()).toLocaleString(), [])
  );
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
            IconNew={PostAddIcon}
            IconEdit={DriveFileRenameOutlineIcon}
            titleNew="Новый документ"
            titleEdit="Изменить реквизиты"
          />
          <DialogContent>
            <FieldForInput
              id="name"
              label="Название"
              changeValue={changeValue}
              value={name}
              dbSchema={dbSchema}
            />

            <Grid container spacing={2} sx={{ pt: 2 }}>
              <Grid xs={6}>
                <FieldForInput
                  id="number"
                  label="Номер"
                  changeValue={changeValue}
                  value={number}
                  dbSchema={dbSchema}
                />
              </Grid>
              <Grid xs={6}>
                <DatePicker
                  id="date"
                  label="Дата"
                  value={dayjs(
                    date
                      ? new Date(
                          date.split(",")[0].split(".").reverse().join("-")
                        )
                      : Date.now()
                  )}
                  onChange={handleChangeDate}
                  sx={{ mt: 1 }}
                />
              </Grid>
            </Grid>
            <Grid sx={{ pt: 2 }}>
              <FieldForInput
                id="notes"
                label="Примечания к документу"
                changeValue={changeValue}
                value={notes}
                dbSchema={dbSchema}
              />
            </Grid>
          </DialogContent>
          <DialogActions sx={{ pr: 2 }}>
            <Button onClick={handleClickOpenClose}>Отмена</Button>
            {menuEditType === "add" ? (
              <Button onClick={handleAddNewItem}>Добавить</Button>
            ) : (
              <Button onClick={handleEditItem}>Сохранить изменения</Button>
            )}
          </DialogActions>
        </Grid>
      </Dialog>
    </div>
  );
}

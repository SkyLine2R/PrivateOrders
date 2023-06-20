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
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import FieldForInput from "../field-for-input/field-for-input";
import AccessControlElement from "../elements/access-control-element";
import { changeValue } from "../Store/Slices/slice-users";

export default function FormDialog({
  menuEditType,
  handleClickOpenClose,
  handleAddNewItem,
  handleEditItem,
  modalWindowIsOpen,
  dbSchema,
}) {
  const { login, name, pass, accessLevel } = useSelector(
    (state) => state.users.inputFields
  );

  const dispatch = useDispatch();

  const handleChangeAccessLevel = (_, newValue) => {
    dispatch(changeValue({ fieldId: "accessLevel", value: newValue }));
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
            ? "Новая учётная запись"
            : menuEditType === "edit"
            ? "Редактирование данных пользователя"
            : "Смена пароля пользователя"}
        </DialogTitle>
        <Grid container spacing={2} sx={{ margin: "0px" }}>
          <DialogContent label="Пользователь">
            <Grid xs={12}>
              <FieldForInput
                id="login"
                label="Логин"
                changeValue={changeValue}
                value={login}
                dbSchema={dbSchema}
                disable={menuEditType === "changePass"}
              />
            </Grid>
            {menuEditType === "changePass" ? (
              ""
            ) : (
              <Grid xs={12}>
                <FieldForInput
                  id="name"
                  label="Имя пользователя"
                  changeValue={changeValue}
                  value={name}
                  dbSchema={dbSchema}
                />
              </Grid>
            )}
            {menuEditType === "add" || menuEditType === "changePass" ? (
              <Grid xs={12}>
                <FieldForInput
                  id="pass"
                  label="Пароль"
                  changeValue={changeValue}
                  value={pass}
                  dbSchema={dbSchema}
                />
              </Grid>
            ) : null}
            {menuEditType === "changePass" ? (
              ""
            ) : (
              <Grid xs={12}>
                <Box sx={{ paddingTop: "20px" }}>
                  <TextField
                    id="accessLevel"
                    label="Уровень доступа для учётной записи"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessControlElement
                            value={accessLevel}
                            change={handleChangeAccessLevel}
                          />
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                </Box>
              </Grid>
            )}
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

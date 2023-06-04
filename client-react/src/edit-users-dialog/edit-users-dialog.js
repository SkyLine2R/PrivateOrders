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
import AccessControlElement from "../access-control-element/access-control-element";
import {
  setModalWindowUsersEditOpen,
  changeValue,
} from "../Store/Slices/slice-users";
import sendNewEntryToDB from "../Store/sendNewEntryToDB";
import sendChangedEntryToDB from "../Store/sendChangedEntryToDB";
import dbSchema from "../../../components/users-db_schema";

export default function FormDialog({ userEditType }) {
  const { login, name, pass, accessLevel } = useSelector(
    (state) => state.users.inputFields
  );

  const { modalWindowUsersEditOpen } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleClickOpenClose = () => {
    dispatch(setModalWindowUsersEditOpen(userEditType));
  };

  const handleChangeAccessLevel = (_, newValue) => {
    dispatch(changeValue({ fieldId: "accessLevel", value: newValue }));
  };

  const handleAddNewUser = () => {
    dispatch(sendNewEntryToDB({ dbSchema, api: "users" }));
  };

  const handleSendChangedUser = () => {
    const editDbSchema = { id: null };

    switch (userEditType) {
      case "editUser":
        editDbSchema.login = dbSchema.login;
        editDbSchema.name = dbSchema.name;
        editDbSchema.accessLevel = dbSchema.accessLevel;
        break;
      case "changePass":
        editDbSchema.pass = dbSchema.pass;
        break;
      default:
        editDbSchema.accessLevel = dbSchema.accessLevel;
    }

    dispatch(
      sendChangedEntryToDB({
        dbSchema: { ...editDbSchema },
        api: "users",
        type: userEditType,
      })
    );
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={modalWindowUsersEditOpen}
        onClose={handleClickOpenClose}
      >
        <DialogTitle sx={{ paddingLeft: "30px" }}>
          {userEditType === "addUser"
            ? "Новая учётная запись"
            : userEditType === "editUser"
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
                disable={userEditType === "changePass"}
              />
            </Grid>
            {userEditType === "changePass" ? (
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
            {userEditType === "addUser" || userEditType === "changePass" ? (
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
            {userEditType === "changePass" ? (
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
          {userEditType === "addUser" ? (
            <Button onClick={handleAddNewUser}>Добавить</Button>
          ) : (
            <Button onClick={handleSendChangedUser}>Сохранить изменения</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

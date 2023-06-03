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
import dbSchema from "../../../components/users-db_schema";

/* import sendNewUser from "../Store/sendNewUser"; */

export default function FormDialog() {
  const { login, name, pass, accessLevel } = useSelector(
    (state) => state.users.inputFields
  );

  const { modalWindowUsersEditOpen } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleClickOpenClose = () => {
    dispatch(setModalWindowUsersEditOpen());
  };

  const handleChangeAccessLevel = (_, newValue) => {
    dispatch(changeValue({ fieldId: "accessLevel", value: newValue }));
  };

  const handleAddNewUser = () => {
    dispatch(sendNewEntryToDB({ dbSchema, api: "users" }));
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
          Новая учётная запись
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
              />
            </Grid>
            <Grid xs={12}>
              <FieldForInput
                id="name"
                label="Имя пользователя"
                changeValue={changeValue}
                value={name}
                dbSchema={dbSchema}
              />
            </Grid>
            <Grid xs={12}>
              <FieldForInput
                id="pass"
                label="Пароль"
                changeValue={changeValue}
                value={pass}
                dbSchema={dbSchema}
              />
            </Grid>
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
          </DialogContent>
        </Grid>

        <DialogActions>
          <Button onClick={handleClickOpenClose}>Отмена</Button>
          <Button onClick={handleAddNewUser}>Добавить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

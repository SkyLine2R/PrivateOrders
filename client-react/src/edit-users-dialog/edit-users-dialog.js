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

import AccessControlElement from "../access-control-element/access-control-element";

import FieldForInput from "../field-for-input/field-for-input";
import {
  setModalWindowUsersEditOpen,
  changeValue,
} from "../Store/Slices/slice-users";

import testFormForInputItem from "../../../components/users-db_schema";
/* import sendNewUser from "../Store/sendNewUser"; */

export default function FormDialog() {
  const { login, name, pass, privelegies } = useSelector(
    (state) => state.users.inputFields
  );

  const { modalWindowUsersEditOpen } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleClickOpenClose = () => {
    dispatch(setModalWindowUsersEditOpen());
  };
  const handleAddNewUser = () => {
    console.log("Отправка пользователя");
    /* dispatch(sendNewUser(dbSchemaUsers)); */
  };

  const handleChangePrivelegies = (event, newValue) => {
    console.log(event);
    changeValue(newValue);
  };
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={modalWindowUsersEditOpen}
        onClose={handleClickOpenClose}
      >
        <DialogTitle>Новая учётная запись</DialogTitle>
        <Grid container spacing={2} sx={{ margin: "0px" }}>
          <DialogContent label="Пользователь">
            <Grid xs={12}>
              <FieldForInput
                id="login"
                label="Логин"
                changeValue={changeValue}
                value={login}
                testFormForInputItem={testFormForInputItem}
              />
            </Grid>
            <Grid xs={12}>
              <FieldForInput
                id="name"
                label="Имя пользователя"
                changeValue={changeValue}
                value={name}
                testFormForInputItem={testFormForInputItem}
              />
            </Grid>
            <Grid xs={12}>
              <FieldForInput
                id="pass"
                label="Пароль"
                changeValue={changeValue}
                value={pass}
                testFormForInputItem={testFormForInputItem}
              />
            </Grid>
            <Grid xs={12}>
              <Box sx={{ paddingTop: "20px" }}>
                <TextField
                  id="accessLevel"
                  label="Уровень доступа учётной записи"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessControlElement
                          value={privelegies}
                          change={handleChangePrivelegies}
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

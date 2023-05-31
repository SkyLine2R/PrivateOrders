import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import AccessControlElement from "../access-control-element/access-control-element";

import FieldForInput from "../field-for-input/field-for-input";
import {
  setModalWindowUsersEditOpen,
  changeValue,
} from "../Store/Slices/slice-users";
import testFormForInputItem from "../../../components/users-db_schema";
/* import sendNewUser from "../Store/sendNewUser"; */

import EditVendorCodeForm from "../edit-vendor-code-form/edit-vendor-code-form";

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

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={modalWindowUsersEditOpen}
        onClose={handleClickOpenClose}
      >
        <DialogTitle>Добавление нового пользователя</DialogTitle>
        <DialogContent label="Пользователь">
          <FieldForInput
            id="login"
            label="Логин"
            changeValue={changeValue}
            value={login}
            testFormForInputItem={testFormForInputItem}
          />
          <FieldForInput
            id="name"
            label="Имя пользователя"
            changeValue={changeValue}
            value={name}
            testFormForInputItem={testFormForInputItem}
          />
          <FieldForInput
            id="pass"
            label="Пароль"
            changeValue={changeValue}
            value={pass}
            testFormForInputItem={testFormForInputItem}
          />
          <AccessControlElement />
          {/*        <EditVendorCodeForm /> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClickOpenClose}>Отмена</Button>
          <Button onClick={handleAddNewUser}>Добавить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

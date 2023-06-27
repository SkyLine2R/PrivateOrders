/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import PersonAdd from "@mui/icons-material/PersonAdd";
import TitleDialog from "../base-elements/dialog-title";
import FieldForInput from "../base-elements/field-for-input";
import AccessControlElement from "../base-elements/access-control-element";
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
        <Grid>
          <TitleDialog
            menuEditType={menuEditType}
            IconNew={PersonAdd}
            IconEdit={ManageAccounts}
            IconPass={AdminPanelSettings}
            titleNew="Новая учётная запись"
            titleEdit="Редактирование данных"
            titlePass="Смена пароля"
          />
          <DialogContent label="Пользователь">
            <FieldForInput
              id="login"
              label="Логин"
              changeValue={changeValue}
              value={login}
              dbSchema={dbSchema}
              disable={menuEditType === "changePass"}
            />

            {menuEditType === "changePass" ? (
              ""
            ) : (
              <Grid sx={{ pt: 2 }}>
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
              <Grid sx={{ pt: 2 }}>
                <FieldForInput
                  id="pass"
                  label={
                    menuEditType === "changePass" ? "Новый пароль" : "Пароль"
                  }
                  changeValue={changeValue}
                  value={pass}
                  dbSchema={dbSchema}
                />
              </Grid>
            ) : null}
            {menuEditType === "changePass" ? (
              ""
            ) : (
              <Grid sx={{ pt: 2 }}>
                <Box sx={{ pt: 1 }}>
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

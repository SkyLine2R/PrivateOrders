import * as React from "react";

import PersonRemove from "@mui/icons-material/PersonRemove";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import PersonAdd from "@mui/icons-material/PersonAdd";

const allMenuActions = [
  {
    icon: <ManageAccounts />,
    name: "editUser",
    tooltipTitle: "Изменить данные пользователя",
  },
  {
    icon: <AdminPanelSettings />,
    name: "changePass",
    tooltipTitle: "Изменить пароль пользователя",
  },
  {
    icon: <PersonRemove />,
    name: "disableUser",
    tooltipTitle: "Отключить аккаунт пользователя",
  },
  {
    icon: <PersonAdd />,
    name: "addUser",
    tooltipTitle: "Добавить нового пользователя",
  },
];

export default allMenuActions;

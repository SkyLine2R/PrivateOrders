import * as React from "react";
import Container from "@mui/material/Container";

import PersonRemove from "@mui/icons-material/PersonRemove";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import PersonAdd from "@mui/icons-material/PersonAdd";

import DataGrid from "../vendor-code-table/vendor-code-table";
import SpeedDialMenu from "../speed-dial-menu/speed-dial-menu";
import dbSchemaUsers from "../../../components/users-db_schema";

const menuActions = [
  {
    icon: <PersonRemove />,
    name: "deleteUser",
    tooltipTitle: "Удалить пользователя",
  },
  {
    icon: <AdminPanelSettings />,
    name: "changePass",
    tooltipTitle: "Изменить пароль пользователя",
  },
  {
    icon: <ManageAccounts />,
    name: "changeUser",
    tooltipTitle: "Изменить данные пользователя",
  },
  {
    icon: <PersonAdd />,
    name: "addUser",
    tooltipTitle: "Добавить нового пользователя",
  },
];

const testData = [
  {
    id: 0,
    login: "Admin",
    name: "Администратор Юзеров",
    privelegies: "10",
    createdAt: "10/10/2023 01:05:25",
  },
  {
    id: 1,
    login: "oleg",
    name: "Олег Василенко",
    privelegies: "99",
    createdAt: "11/10/2023 01:05:25",
  },
];

export default function Stock() {
  const [menuPlace, setMenuPlace] = React.useState({ x: 0, y: 0 });

  const toggleMenu = (GridCellParams, { clientX, clientY }) => {
    setMenuPlace(menuPlace.x ? { x: 0, y: 0 } : { x: clientX, y: clientY });
  };

  const closeMenu = () => {
    if (menuPlace.x) setMenuPlace({ x: 0, y: 0 });
  };

  return (
    <Container maxWidth="md" sx={{ margin: "20px auto" }} onClick={closeMenu}>
      <DataGrid
        dbSchema={dbSchemaUsers}
        dataArr={testData}
        onCellClick={toggleMenu}
      />
      <SpeedDialMenu menuPlace={menuPlace} actions={menuActions} />
    </Container>
  );
}

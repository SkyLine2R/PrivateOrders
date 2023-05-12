import * as React from "react";
import Container from "@mui/material/Container";

import PersonRemove from "@mui/icons-material/PersonRemove";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import PersonAdd from "@mui/icons-material/PersonAdd";

import DataGrid from "../vendor-code-table/vendor-code-table";
import SpeedDialMenu from "../speed-dial-menu/speed-dial-menu";
import dbSchemaUsers from "../../../components/users-db_schema";

const allMenuActions = [
  {
    icon: <PersonRemove />,
    name: "deleteUser",
    tooltipTitle: "Отключить аккаунт пользователя",
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

export default function UsersEditPage() {
  const [menuPlace, setMenuPlace] = React.useState({ x: 0, y: 0 });
  const [menuActions, setMenuActions] = React.useState(allMenuActions);

  const toggleMenuInDataGrid = ({ id }, e) => {
    e.stopPropagation();
    setMenuPlace(
      menuPlace.x
        ? { x: 0, y: 0, id: undefined }
        : { x: e.clientX, y: e.clientY, id }
    );
    setMenuActions(allMenuActions);
  };

  const toggleMenuInContainer = ({ clientX, clientY }) => {
    setMenuPlace(
      menuPlace.x
        ? { x: 0, y: 0, id: undefined }
        : { x: clientX, y: clientY, id: undefined }
    );
    setMenuActions([allMenuActions[3]]);
  };

  const menuSelect = (e, e2) => {
    console.log(`e`);
    console.log(`e2`);
  };

  return (
    <Container
      maxWidth="md"
      sx={{ margin: "20px auto" }}
      onClick={toggleMenuInContainer}
    >
      <DataGrid
        dbSchema={dbSchemaUsers}
        dataArr={testData}
        onCellClick={toggleMenuInDataGrid}
      />
      <SpeedDialMenu
        menuPlace={menuPlace}
        actions={menuActions}
        onClickFunc={menuSelect}
        anchorEl={UsersEditPage}
      />
    </Container>
  );
}
